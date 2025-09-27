import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';
import { CheckoutDto } from './dto';
import { OrdersService } from '../orders/orders.service';
import { shippingOptions } from './utils';
import { allowedCountries } from '../common/utils';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CheckoutService implements OnModuleInit {
  stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private ordersService: OrdersService,
    private productsService: ProductsService,
  ) {}

  onModuleInit() {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2024-04-10',
    });
  }

  async constructEventFromPayload(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
    const session = event.data.object as Stripe.Checkout.Session;
    if (event.type === 'checkout.session.completed') {
      const productIds = session.metadata.bagItemIds
        .split(',')
        .map((id) => +id);
      const quantities = session.metadata.quantities
        .split(',')
        .map((id) => +id);

      const { city, country, postal_code, state, line1, line2 } =
        session.customer_details.address;
      await this.ordersService.create({
        id: session.payment_intent.toString(),
        tax: session.total_details.amount_tax,
        line1,
        line2,
        state,
        country,
        city,
        postalCode: postal_code,
        total: session.amount_subtotal,
        phone: session.customer_details.phone,
        email: session.customer_details.email,
        bag: productIds.map((id, index) => ({
          productId: id,
          qty: quantities[index],
        })),
        customer: session.customer_details.name,
        shippingCost: session.shipping_cost.amount_subtotal,
      });
      for (let index in productIds) {
        const product = await this.productsService.findOne(productIds[index]);
        await this.productsService.update(product.id, {
          inStock: product.inStock - quantities[index],
        });
      }
    }
  }

  async checkout({ bag }: CheckoutDto, apiUrl: string) {
    const bagItemIds = bag.map((item) => item.productId);
    const bagItemQuantities = bag.map((item) => item.qty);
    const products = await this.prisma.product.findMany({
      where: { id: { in: bagItemIds } },
      include: {
        images: {
          take: 1,
          select: { file: { select: { id: true, url: true } } },
        },
      },
    });
    if (products.length !== bagItemIds.length)
      throw new NotFoundException({
        success: false,
        message: 'Cannot find some products in bag',
      });
    if (
      bag.some(
        (item, i) =>
          item.qty <= 0 ||
          item.qty > products.find((p) => p.id === bagItemIds[i]).inStock,
      )
    )
      throw new BadRequestException({
        success: false,
        message:
          "Quantity must be positive and less than or equal to what's in stock",
      });

    const bagItemsWithProducts = bagItemQuantities.map((qty, i) => ({
      qty,
      ...products.find((p) => p.id === bagItemIds[i]),
    }));
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    bagItemsWithProducts.forEach((item) => {
      lineItems.push({
        quantity: item.qty,
        price_data: {
          currency: 'USD',
          product_data: {
            name: item.name,
            images: item.images.map(
              (image) => image.file?.url || `${apiUrl}/files/${image.file.id}`,
            ),
          },
          unit_amount: +(+item.price.toFixed(2) * 100).toFixed(2),
        },
      });
    });

    const session = await this.stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: allowedCountries,
      },
      shipping_options: shippingOptions,
      line_items: lineItems,
      mode: 'payment',
      billing_address_collection: 'required',
      automatic_tax: { enabled: true },
      phone_number_collection: { enabled: true },
      success_url: `${this.configService.get(
        'CORS_ORIGIN_STORE',
      )}/bag?success=1`,
      cancel_url: `${this.configService.get(
        'CORS_ORIGIN_STORE',
      )}/bag?cancelled=1`,
      metadata: {
        bagItemIds: bagItemIds.join(','),
        quantities: bagItemQuantities.join(','),
      },
    });

    return { checkoutUrl: session.url };
  }
}

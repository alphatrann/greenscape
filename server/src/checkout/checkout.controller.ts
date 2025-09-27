import {
  Body,
  Controller,
  ForbiddenException,
  Headers,
  Post,
  Req,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto';
import { ReqWithRawBody } from '../common/interfaces';
import { Request } from 'express';

@Controller()
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('checkout')
  async checkout(@Body() checkoutDto: CheckoutDto, @Req() req: Request) {
    const protocol = req.protocol;
    const host = req.get('host');
    const originalUrl = req.originalUrl;

    const apiUrl = `${protocol}://${host}${originalUrl}`;
    const { checkoutUrl } = await this.checkoutService.checkout(
      checkoutDto,
      apiUrl,
    );
    return { success: true, checkoutUrl };
  }

  @Post('webhook')
  async handleAfterPayment(
    @Headers('stripe-signature') signature: string,
    @Req() req: ReqWithRawBody,
  ) {
    if (!signature)
      throw new ForbiddenException({
        success: false,
        message: 'Missing stripe-signature header',
      });
    await this.checkoutService.constructEventFromPayload(
      signature,
      req.rawBody,
    );
    return { success: true };
  }
}

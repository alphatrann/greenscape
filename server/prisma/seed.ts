import { PrismaClient } from '@prisma/client';
import { allowedCountries } from '../src/common/utils/allowed-countries';
import {
  fakerEN_GB,
  fakerEN_US,
  fakerEN_CA,
  fakerEN_AU,
  fakerFR,
  fakerFR_BE,
  fakerJA,
  fakerDE,
} from '@faker-js/faker';
import {
  fakerNL,
  fakerSV,
  fakerNB_NO,
  fakerDA,
  fakerFI,
  fakerEN_IE,
  fakerDE_AT,
  fakerPT_PT,
  fakerVI,
} from '@faker-js/faker';
import { faker } from '@faker-js/faker';
import { addDays } from 'date-fns';

const prisma = new PrismaClient();

// Helper to generate country-specific data
function countryData(country: string) {
  switch (country) {
    case 'US':
      return {
        phone: fakerEN_US.phone.number(),
        state: fakerEN_US.location.state(),
        city: fakerEN_US.location.city(),
        postalCode: fakerEN_US.location.zipCode(),
        line1: fakerEN_US.location.streetAddress(),
        line2: fakerEN_US.datatype.boolean()
          ? fakerEN_US.location.secondaryAddress()
          : null,
      };
    case 'CA':
      return {
        phone: fakerEN_CA.phone.number(),
        state: fakerEN_CA.location.state(),
        city: fakerEN_CA.location.city(),
        postalCode: fakerEN_CA.location.zipCode(),
        line1: fakerEN_CA.location.streetAddress(),
        line2: fakerEN_CA.datatype.boolean()
          ? fakerEN_CA.location.secondaryAddress()
          : null,
      };
    case 'GB':
      return {
        phone: fakerEN_GB.phone.number(),
        state: null,
        city: fakerEN_GB.location.city(),
        postalCode: fakerEN_GB.location.zipCode(),
        line1: fakerEN_GB.location.streetAddress(),
        line2: fakerEN_GB.datatype.boolean()
          ? fakerEN_GB.location.secondaryAddress()
          : null,
      };
    case 'AU':
      return {
        phone: fakerEN_AU.phone.number(),
        state: fakerEN_AU.location.state(),
        city: fakerEN_AU.location.city(),
        postalCode: fakerEN_AU.location.zipCode(),
        line1: fakerEN_AU.location.streetAddress(),
        line2: fakerEN_AU.datatype.boolean()
          ? fakerEN_AU.location.secondaryAddress()
          : null,
      };
    case 'SG':
      return {
        phone: faker.phone.number(),
        state: null,
        city: 'Singapore',
        postalCode: faker.location.zipCode(),
        line1: faker.location.streetAddress(),
        line2: null,
      };
    case 'JP':
      return {
        phone: fakerJA.phone.number(),
        state: fakerJA.location.state(),
        city: fakerJA.location.city(),
        postalCode: fakerJA.location.zipCode(),
        line1: fakerJA.location.streetAddress(),
        line2: null,
      };
    case 'FR':
      return {
        phone: fakerFR.phone.number(),
        state: null,
        city: fakerFR.location.city(),
        postalCode: fakerFR.location.zipCode(),
        line1: fakerFR.location.streetAddress(),
        line2: null,
      };
    case 'DE':
      return {
        phone: fakerDE.phone.number(),
        state: null,
        city: fakerDE.location.city(),
        postalCode: fakerDE.location.zipCode(),
        line1: fakerDE.location.streetAddress(),
        line2: null,
      };
    case 'NL': // Netherlands
      return {
        phone: fakerNL.phone.number(),
        state: null,
        city: fakerNL.location.city(),
        postalCode: fakerNL.location.zipCode(),
        line1: fakerNL.location.streetAddress(),
        line2: null,
      };
    case 'BE': // Belgium
      return {
        phone: fakerFR_BE.phone.number(),
        state: null,
        city: fakerFR_BE.location.city(),
        postalCode: fakerFR_BE.location.zipCode(),
        line1: fakerFR_BE.location.streetAddress(),
        line2: null,
      };
    case 'SE': // Sweden
      return {
        phone: fakerSV.phone.number(),
        state: null,
        city: fakerSV.location.city(),
        postalCode: fakerSV.location.zipCode(),
        line1: fakerSV.location.streetAddress(),
        line2: null,
      };
    case 'NO': // Norway
      return {
        phone: fakerNB_NO.phone.number(),
        state: null,
        city: fakerNB_NO.location.city(),
        postalCode: fakerNB_NO.location.zipCode(),
        line1: fakerNB_NO.location.streetAddress(),
        line2: null,
      };
    case 'DK': // Denmark
      return {
        phone: fakerDA.phone.number(),
        state: null,
        city: fakerDA.location.city(),
        postalCode: fakerDA.location.zipCode(),
        line1: fakerDA.location.streetAddress(),
        line2: null,
      };
    case 'FI': // Finland
      return {
        phone: fakerFI.phone.number(),
        state: null,
        city: fakerFI.location.city(),
        postalCode: fakerFI.location.zipCode(),
        line1: fakerFI.location.streetAddress(),
        line2: null,
      };
    case 'IE': // Ireland
      return {
        phone: fakerEN_IE.phone.number(),
        state: null,
        city: fakerEN_IE.location.city(),
        postalCode: fakerEN_IE.location.zipCode(),
        line1: fakerEN_IE.location.streetAddress(),
        line2: null,
      };
    case 'AT': // Austria
      return {
        phone: fakerDE_AT.phone.number(),
        state: null,
        city: fakerDE_AT.location.city(),
        postalCode: fakerDE_AT.location.zipCode(),
        line1: fakerDE_AT.location.streetAddress(),
        line2: null,
      };
    case 'PT': // Portugal
      return {
        phone: fakerPT_PT.phone.number(),
        state: null,
        city: fakerPT_PT.location.city(),
        postalCode: fakerPT_PT.location.zipCode(),
        line1: fakerPT_PT.location.streetAddress(),
        line2: null,
      };
    case 'VN': // Vietnam
      return {
        phone: fakerVI.phone.number(),
        state: null,
        city: fakerVI.location.city(),
        postalCode: fakerVI.location.zipCode(),
        line1: fakerVI.location.streetAddress(),
        line2: null,
      };
    // ...existing default...
    default:
      return {
        phone: faker.phone.number(),
        state: null,
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        line1: faker.location.streetAddress(),
        line2: null,
      };
  }
}

async function main() {
  const products = await prisma.product.findMany();
  if (products.length === 0) throw new Error('No products found.');

  await prisma.product.updateMany({
    data: {
      createdAt: faker.date.past({ years: 5 }),
    },
  });
  const orders = await prisma.order.findMany({
    select: {
      id: true,
      total: true,
    },
  });

  for (const { id, total } of orders) {
    const randomDate = faker.date.past({ years: 5 });
    const shippingCost = faker.helpers.weightedArrayElement([
      { value: 0, weight: 0.8 },
      { value: 15, weight: 0.2 },
    ]);
    await prisma.order.update({
      where: { id },
      data: {
        shippingCost,
        tax: total * faker.number.float({ min: 0, max: 0.5 }),
        createdAt: randomDate,
        deliveredAt: addDays(
          randomDate,
          shippingCost > 0
            ? faker.number.int({ min: 5, max: 14 })
            : faker.number.int({ min: 1, max: 3 }),
        ),
      },
    });
  }

  const ordersData = Array.from({ length: 200 }).map((_, i) => {
    const shippingCost = faker.helpers.weightedArrayElement([
      { value: 0, weight: 0.6 },
      { value: 15, weight: 0.4 },
    ]);
    const country = faker.helpers.arrayElement(allowedCountries);
    const delivered = faker.datatype.boolean();
    const productCount = faker.number.int({ min: 1, max: 3 });
    const pickedProducts = faker.helpers.arrayElements(products, productCount);
    const latestCreatedAt = pickedProducts.reduce((latest, p) => {
      return p.createdAt > latest ? p.createdAt : latest;
    }, new Date(0));
    // Ensure order's createdAt is after all its products' createdAt
    const createdAt = faker.date.between({
      from: latestCreatedAt,
      to: new Date(),
    });
    const address = countryData(country);
    // Vary createdAt hours, minutes, seconds
    const createdAtVaried = new Date(createdAt);
    createdAtVaried.setHours(faker.number.int({ min: 0, max: 23 }));
    createdAtVaried.setMinutes(faker.number.int({ min: 0, max: 59 }));
    createdAtVaried.setSeconds(faker.number.int({ min: 0, max: 59 }));

    const deliveredAt = delivered
      ? addDays(
          createdAtVaried,
          shippingCost === 0
            ? faker.number.int({ min: 5, max: 14 })
            : faker.number.int({ min: 1, max: 3 }),
        )
      : null;

    const toCreateProducts = pickedProducts.map((p) => ({
      productId: p.id,
      price: p.price,
      qty: faker.number.int({ min: 1, max: 5 }),
    }));
    const total = toCreateProducts.reduce((acc, p) => acc + p.price * p.qty, 0);

    return {
      id: faker.string.alphanumeric(24),
      customer: faker.person.fullName(),
      email: faker.internet.email(),
      phone: address.phone,
      line1: address.line1,
      line2: address.line2,
      state: address.state,
      city: address.city,
      postalCode: address.postalCode,
      shippingCost,
      country,
      total,
      tax: total * faker.number.float({ min: 0, max: 0.5 }),
      createdAt,
      deliveredAt,
      products: {
        create: toCreateProducts.map((p) => ({
          productId: p.productId,
          qty: p.qty,
        })),
      },
    };
  });

  for (const order of ordersData) {
    await prisma.order.create({ data: order });
  }

  console.log('Seeded orders!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

import Stripe from 'stripe';

export const allowedCountries: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  [
    'US',
    'CA',
    'GB',
    'AU',
    'SG',
    'JP',
    'VN',
    'FR',
    'DE',
    'IT',
    'ES',
    'NL',
    'BE',
    'CH',
    'SE',
    'NO',
    'DK',
    'FI',
    'IE',
    'AT',
    'PT',
    'NZ',
  ];

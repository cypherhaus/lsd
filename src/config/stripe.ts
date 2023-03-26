// stripe.js

import { loadStripe } from "@stripe/stripe-js";

const initStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? "");

let stripeClient: any;

export const getStripeClient = async () => {
  if (!stripeClient) stripeClient = await initStripe;
  return stripeClient;
};

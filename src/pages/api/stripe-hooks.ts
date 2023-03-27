import initStripe from "stripe";
import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = { api: { bodyParser: false } };

type Data = {
  received: boolean;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) => {
  // @ts-ignore
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY ?? "");
  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error) {
    console.log(error);
    return res.status(400).send("webhook error");
  }

  console.log({ event });

  res.send({ received: true });
};

export default handler;

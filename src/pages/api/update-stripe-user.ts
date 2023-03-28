// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import initStripe from "stripe";

type Data = {
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) => {
  // Handle OPTIONS requests
  if (req.method === "OPTIONS") return res.status(200).end();

  const { API_ROUTE_SECRET } = req.query;
  if (API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("Unauthorized");
  }

  const { first_name, stripe_customer } = req.body.record;
  if (!stripe_customer || !first_name) {
    return res
      .status(402)
      .json({ message: "Please provide email and user id" });
  }

  try {
    // @ts-ignore
    const stripe = initStripe(process.env.STRIPE_SECRET_KEY ?? "");

    await stripe.customers.update(req.body.record.stripe_customer, {
      name: `${req.body.record.first_name} ${req.body.record.last_name}`,
    });

    res.status(200).json({ message: "Successfully updated user" });
  } catch (err) {
    res.status(401).json({ message: "Error" });
    console.log({ err });
  }
};

export default handler;

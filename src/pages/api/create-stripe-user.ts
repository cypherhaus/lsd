// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../config/supabase";
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

  const { email, id } = req.body.record;
  if (!email || !id) {
    return res
      .status(402)
      .json({ message: "Please provide email and user id" });
  }

  try {
    // @ts-ignore
    const stripe = initStripe(process.env.STRIPE_SECRET_KEY ?? "");

    const customer = await stripe.customers.create({
      email: req.body.record.email,
    });

    await supabase
      .from("profiles")
      .update({
        stripe_customer: customer.id,
      })
      .eq("id", req.body.record.id);

    res.status(200).json(customer);
  } catch (err) {
    res.status(200).json({ message: "Error" });
    console.log({ err });
  }
};

export default handler;

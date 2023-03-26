import { supabase } from "../../../config/supabase";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import initStripe from "stripe";
import { PROFILES_TABLE } from "../../../constants/db";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) return res.status(401).send("Unauthorized");

  const {
    data: { stripe_customer },
  } = await supabase
    .from(PROFILES_TABLE)
    .select("stripe_customer")
    .eq("id", user.id)
    .single();

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY ?? "");
  const { planId } = req.query;

  const lineItems = [
    {
      price: planId,
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancelled",
  });

  res.send({
    id: session.id,
  });
};

export default handler;

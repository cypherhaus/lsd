import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );
  const supabaseServerClient = createServerSupabaseClient<any>({
    req,
    res,
  });

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (req.method === "POST") {
    const { amount } = req.body;

    if (!amount) {
      res.status(400).json({
        message: "Must provide an amount",
      });
      return;
    }

    try {
      const amountInMsats = (parseInt(amount) * 1000).toString();
      const chargeId = uuidv4();

      const response = await supabase.from("charges").insert({
        id: chargeId,
        amount: parseInt(amountInMsats) / 1000,
        user_id: user?.id,
      });

      if (response.status === 403) {
        res.status(403).json({
          message: "You do not have the authorization to create a charge",
        });
        return;
      }

      const data = await axios.post(
        "https://api.zebedee.io/v0/charges",
        {
          expiresIn: 600,
          amount: amountInMsats,
          description: "-",
          internalId: chargeId,
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/settle-charge?id=${chargeId}`,
        },
        {
          headers: {
            apikey: process.env.ZEBEDEE_KEY ?? "",
            "Content-Type": "application/json",
          },
        }
      );

      res.status(201).json({
        message: "Successfully created charge",
        ...data.data,
      });
    } catch (err) {
      console.log({ err });
      res.status(500).json({ message: "Error creating charge" });
    }
  } else {
    res.status(200).json({});
  }
};

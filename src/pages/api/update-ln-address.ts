import axios from "axios";
import { supabase } from "../../config/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const supabaseServerClient = createServerSupabaseClient<any>({
      req,
      res,
    });

    const {
      data: { user },
    } = await supabaseServerClient.auth.getUser();

    const { lnAddress } = req.body;
    if (!lnAddress) {
      res.status(400).json({
        message: "Must provide a lightning address",
      });
      return;
    }

    try {
      const data = await axios.get(
        `https://api.zebedee.io/v0/ln-address/validate/${lnAddress}`,
        {
          headers: {
            apikey: process.env.ZEBEDEE_KEY ?? "",
            "Content-Type": "application/json",
          },
        }
      );

      if (data.data?.data.valid) {
        await supabase
          .from("profiles")
          .update({ ln_address: lnAddress })
          .eq("id", user?.id);

        res.status(201).json({
          message: "Successfully added lightning address",
        });
        return;
      } else {
        res.status(400).json({ message: "ln address is invalid" });
        return;
      }
    } catch (err) {
      res.status(500).json({ message: "Error processing ln address" });
      return;
    }
  } else {
    res.status(200).setHeader("Access-Control-Allow-Origin", "*").end();
    return;
  }
};

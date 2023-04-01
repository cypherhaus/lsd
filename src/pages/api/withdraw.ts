import axios from "axios";
import { supabase } from "../../config/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { amount } = req.body;

      if (!amount) {
        res.status(400).json({
          message: "Must provide a lightning address",
        });
        return;
      }

      const supabaseServerClient = createServerSupabaseClient<any>({
        req,
        res,
      });

      const {
        data: { user },
      } = await supabaseServerClient.auth.getUser();

      const balanceCheck = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (!balanceCheck.data.ln_address) {
        res.status(404).json({ message: "No associated lightning address" });
        return;
      }

      if (!balanceCheck.data) {
        res.status(500).json({ message: "Failed to get balance" });
        return;
      }

      const balance = balanceCheck.data.balance;

      if (balance < parseInt(amount)) {
        res.status(500).json({ message: "Insufficient Balance" });
        return;
      }

      const withdrawal = await supabase
        .from("withdrawals")
        .insert({
          user_id: user?.id,
          ln_address: balanceCheck.data.ln_address,
          amount,
        })
        .select();

      if (withdrawal.status !== 201) {
        res
          .status(500)
          .json({ message: "Server Error - Could not get withdrawal data" });
        return;
      }

      const data = await axios.post(
        `https://api.zebedee.io/v0/ln-address/send-payment`,
        {
          lnAddress: balanceCheck.data.ln_address,
          amount: parseInt(amount) * 1000,
          comment: "Withdraw from Supa ZBD",
        },
        {
          headers: {
            apikey: process.env.ZEBEDEE_KEY ?? "",
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status !== 200) {
        res.status(data.status).json({ message: "ZEBEDEE Server Error" });
        return;
      }

      await supabase
        .from("withdrawals")
        .update({
          settled: true,
        })
        .eq("id", withdrawal.data[0].id);

      res.status(200).json({
        message: "Successfully withdrawn sats",
      });
      return;
    } catch (err) {
      if (err?.response?.data?.message) {
        console.log("Error:", err?.response?.data?.message);
        res
          .status(500)
          .json({ message: `ZBD Error: ${err?.response?.data?.message}` });
        return;
      }

      res.status(500).json({ message: "Server Error" });
      return;
    }
  }

  res.status(500).json({
    message: "Must be a POST Request",
  });
};

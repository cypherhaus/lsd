import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { supabase } from "../config/supabase";
import { SETTLE_CHARGE } from "../constants/endpoints";
export default class LightningApi {
  fetchWallet = async (userId: string) => {
    const data = await supabase.from("profiles").select().eq("id", userId);

    return data?.data?.[0];
  };

  payUser = async (
    currentUserId: string,
    sendToUsername: string,
    amount: number
  ) => {
    // CLIENT SIDE
    try {
      const response = await supabase
        .from("profiles")
        .select()
        .eq("username", sendToUsername);

      if (response.data?.length) {
        const data = await supabase.from("payments").insert({
          debit: amount,
          user_id: currentUserId,
          participant_id: response.data[0].id,
        });

        if (response.status === 200) {
          return {
            success: true,
            data,
            message: "Successfully sent a payment",
          };
        }
      } else {
        console.log("no matching user");
        return { success: false, message: "No Matching User" };
      }
    } catch (err) {
      console.log({ err });
    }
    return { success: false, message: "Internal Error" };
  };

  // to calculate balance
  //  (total of debits - credits in settlements) + (total of debits - credits in payments)

  createCharge = async (sats: string, userId: string) => {
    const amountInMsats = (parseInt(sats) * 1000).toString();
    const chargeId = uuidv4();

    console.log(
      `${process.env.REACT_APP_SERVERLESS_BASE_URL}/${SETTLE_CHARGE}?id=${chargeId}`
    );

    try {
      const data = await axios.post(
        "https://api.zebedee.io/v0/charges",
        {
          expiresIn: 300,
          amount: amountInMsats,
          description: "-",
          internalId: chargeId,
          callbackUrl: `${process.env.REACT_APP_SERVERLESS_BASE_URL}/${SETTLE_CHARGE}?id=${chargeId}`,
        },
        {
          headers: {
            apikey: process.env.REACT_APP_ZEBEDEE_KEY ?? "",
            "Content-Type": "application/json",
          },
        }
      );

      await supabase.from("charges").insert({
        id: chargeId,
        amount: parseInt(amountInMsats) / 1000,
        user_id: userId,
      });

      if (data) {
        return data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  };
}

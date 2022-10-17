import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { supabase } from "../config/supabase";
import { SETTLE_CHARGE } from "../constants/endpoints";
export default class LightningApi {
  fetchWallet = async (userId: string) => {
    const data = await supabase.from("profile").select().eq("id", userId);

    return data?.data?.[0];
  };

  createCharge = async (sats: string, userId: string) => {
    const amountInMsats = (parseInt(sats) * 1000).toString();
    const chargeId = uuidv4();
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

      await supabase
        .from("charge")
        .insert({ id: chargeId, amount: amountInMsats, user_id: userId });

      if (data) {
        return data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  };
}

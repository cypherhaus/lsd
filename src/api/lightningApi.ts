import axios from "axios";

import { supabase } from "../config/supabase";
export default class LightningApi {
  fetchWallet = async (userId: string) => {
    const data = await supabase.from("profiles").select().eq("id", userId);

    return data?.data?.[0];
  };

  updateLnAddress = async (lnAddress: string, id: string) => {
    if (!process.env.REACT_APP_SERVERLESS_BASE_URL) return;
    const response = await axios.get(
      `${process.env.REACT_APP_SERVERLESS_BASE_URL}/update-ln-address?lnAddress=${lnAddress}&id=${id}`
    );

    if (response.status === 201) {
      return { success: true, message: "Successfully added lightning address" };
    }

    return { success: false, message: "Failed to add lightning address" };
  };

  withdrawToAddress = async () => {
    // send user id to serveles function
    // Get the wallet and ln address
    // Check the balance is enough
    // Initiate the withdraw with zbd
    // Update supabase with a withdrawl settlement credit
  };

  // Todo - Add RLS
  payUser = async (
    currentUserId: string,
    sendToUsername: string,
    amount: number
  ) => {
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

  createCharge = async (sats: string, userId: string) => {
    if (!process.env.REACT_APP_SERVERLESS_BASE_URL) return;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVERLESS_BASE_URL}/create-charge?amount=${sats}&id=${userId}`
      );

      return response.data;
    } catch (err) {
      console.log({ err });
    }
  };
}

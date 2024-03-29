import axios, { AxiosInstance } from "axios";

import { supabase } from "../config/supabase";
import {
  BASE_URL,
  CREATE_CHARGE,
  UPDATE_LN_ADDRESS,
  WITHDRAW,
} from "../constants/endpoints";
import { errorToast } from "../utils/toast";

export default class LightningApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {},
      timeout: 15000,
    });
  }

  fetchWallet = async (userId: string) => {
    const data = await supabase.from("profiles").select().eq("id", userId);

    return data?.data?.[0];
  };

  updateLnAddress = async (lnAddress: string) => {
    const response = await this.api.post(`../api/${UPDATE_LN_ADDRESS}`, {
      lnAddress,
    });

    if (response.status === 201) {
      return { success: true, message: "Successfully added lightning address" };
    }

    return { success: false, message: "Failed to add lightning address" };
  };

  withdrawToAddress = async (amount: string) => {
    try {
      await this.api.post(`../api/${WITHDRAW}`, {
        amount,
      });

      return { success: true, message: "Successful withdrawal" };
    } catch (err) {
      return { success: false, message: "Failed to withdraw" };
    }
  };

  payUser = async (
    currentUserId: string,
    sendToUsername: string,
    amount: string
  ) => {
    if (parseInt(amount) < 0) {
      errorToast("Amount must be more than zero");
      return { success: false, message: "Invalid amount" };
    }
    try {
      const response = await supabase
        .from("profiles")
        .select()
        .eq("username", sendToUsername);

      if (response.data?.length) {
        const data = await supabase.from("payments").insert({
          debit: parseInt(amount),
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
        errorToast(`No user matching username ${sendToUsername}`);
        return { success: false, message: "No Matching User" };
      }
    } catch (err) {
      console.log({ err });
    }
    errorToast(`Error with payment. Try again later.`);
    return { success: false, message: "Internal Error" };
  };

  createCharge = async (sats: string) => {
    try {
      const response = await this.api.post(`../api/${CREATE_CHARGE}`, {
        amount: sats,
      });

      return response.data;
    } catch (err) {
      console.log({ err });
    }
  };
}

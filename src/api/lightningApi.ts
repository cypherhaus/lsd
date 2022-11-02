import axios, { AxiosInstance } from "axios";

import { supabase } from "../config/supabase";
import {
  BASE_URL,
  CREATE_CHARGE,
  UPDATE_LN_ADDRESS,
  WITHDRAW_LN_ADDRESS,
} from "../constants/endpoints";

export default class LightningApi {
  private api: AxiosInstance;
  private token: string = "";

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {},
      timeout: 15000,
    });
  }

  setToken = (token: string) => {
    this.token = token;
  };

  clearToken = () => {
    this.token = "";
  };

  fetchWallet = async (userId: string) => {
    const data = await supabase.from("profiles").select().eq("id", userId);

    return data?.data?.[0];
  };

  updateLnAddress = async (lnAddress: string, id: string) => {
    if (!this.token) return;

    const response = await this.api.post(
      `/${UPDATE_LN_ADDRESS}?lnAddress=${lnAddress}&id=${id}`,
      { token: this.token }
    );

    if (response.status === 201) {
      return { success: true, message: "Successfully added lightning address" };
    }

    return { success: false, message: "Failed to add lightning address" };
  };

  withdrawToAddress = async (amount: string, id: string) => {
    if (!this.token) return;

    try {
      const response = await this.api.post(
        `/${WITHDRAW_LN_ADDRESS}?amount=${amount}&userId=${id}`,
        { token: this.token }
      );

      if (response.status === 200) {
        return { success: true, message: "Successful withdrawal" };
      }
    } catch (err) {
      console.log({ err });
      return { success: false, message: "Failed to withdraw" };
    }
    return { success: false, message: "Failed to withdraw" };
  };

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
    if (!this.token) return;

    try {
      const response = await this.api.post(
        `/${CREATE_CHARGE}?amount=${sats}&id=${userId}`,
        { token: this.token }
      );

      return response.data;
    } catch (err) {
      console.log({ err });
    }
  };
}

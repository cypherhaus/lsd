/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { Moment } from "moment";
import { AddBlockedTime, Shift } from "../../types/bookings";
import { supabase } from "../config/supabase";

export default class DashAPI {
  fetchProfile = async (id: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", id);
    if (data) return data[0];
    return false;
  };

  fetchBookings = async (userId: string) => {
    const { data, error } = await supabase.from("bookings").select("*");
    if (data) return data;
    return false;
  };

  fetchShifts = async (userId: string) => {
    const { data, error } = await supabase
      .from("shifts")
      .select("*")
      .eq("user_id", userId);
    return data;
  };

  addShift = async ({ start_time, end_time, iso_weekday, user_id }: Shift) => {
    const res = await supabase.from("shifts").upsert({
      start_time,
      end_time,
      iso_weekday,
      user_id,
    });

    if (res?.status === 201) return true;
    return false;
  };

  updateShifts = async (newShifts: Shift[]) => {
    const res = await supabase.from("shifts").upsert(newShifts);
    if (res?.status === 201) return true;
    return false;
  };

  deleteShift = async (id: string) => {
    const res = await supabase.from("shifts").delete().eq("id", id);
    if (res?.status === 201) return true;
    return false;
  };

  addBlockedTime = async (blockedTime: AddBlockedTime) => {
    const res = await supabase.from("blocked_times").insert(blockedTime);

    if (res?.status === 201) return true;
    return false;
  };

  postBusiness = async (name: string, id: string) => {
    const res = await supabase.from("businesses").insert({ name, owner_id: id });
    if (res?.status === 201) return true;
    return false;
  };

  fetchBlockedTimes = async (userId: string) => {
    const res = await supabase
      .from("blocked_times")
      .select("*")
      .eq("user_id", userId);
    return res;
  };

  fetchTeam = async (businessId: string) => {
    const response = await supabase
      .from("profiles")
      .select("*")
      .eq("business_id", businessId);

    if (response?.data) {
      return response.data;
    }
  };

  addTeamMember = async (businessId: string) => {
    const response = await supabase
      .from("team_invitations")
      .insert({ business_id: businessId, email: "test@email.com" });

    return response;
  };
}

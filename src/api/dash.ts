/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { supabase } from "../config/supabase";

// Types
import { AddBlockedTime, Shift } from "../../types/bookings";

// Constants
import {
  PROFILES_TABLE,
  SHIFTS_TABLE,
  BLOCKED_TIMES_TABLE,
  BUSINESSES_TABLE,
  BOOKINGS_TABLE,
  TEAM_INVITATIONS_TABLE,
} from "../constants/db";

export default class DashAPI {
  fetchProfile = async (id: string) => {
    const res2 = await supabase.from(PROFILES_TABLE).select().eq("id", id);
    console.log({ res2 });
    if (res2.data) return res2.data[0];
    return false;
  };

  fetchBookings = async (userId: string) => {
    const { data, error } = await supabase.from(BOOKINGS_TABLE).select("*");
    if (data) return data;
    return false;
  };

  fetchShifts = async (userId: string) => {
    const { data, error } = await supabase
      .from(SHIFTS_TABLE)
      .select("*")
      .eq("user_id", userId);
    return data;
  };

  postShiftsToUpdate = async (newShifts: Shift[]) => {
    const res = await supabase
      .from(SHIFTS_TABLE)
      .upsert(newShifts, { onConflict: "id", ignoreDuplicates: false });
    if (res?.status === 201) return true;
    return false;
  };

  postShiftsToDelete = async (shifts: string[]) => {
    const res = await supabase.from(SHIFTS_TABLE).delete().in("id", shifts);
    if (res?.status === 201) return true;
    return false;
  };

  addBlockedTime = async (blockedTime: AddBlockedTime) => {
    const res = await supabase.from(BLOCKED_TIMES_TABLE).insert(blockedTime);

    if (res?.status === 201) return true;
    return false;
  };

  postBusiness = async (name: string, id: string) => {
    const res = await supabase
      .from(BUSINESSES_TABLE)
      .insert({ name, owner_id: id });
    if (res?.status === 201) return true;
    return false;
  };

  fetchBlockedTimes = async (userId: string) => {
    const res = await supabase
      .from(BLOCKED_TIMES_TABLE)
      .select("*")
      .eq("user_id", userId);
    return res;
  };

  fetchTeam = async (businessId: string) => {
    const response = await supabase
      .from(PROFILES_TABLE)
      .select("*")
      .eq("business_id", businessId);

    if (response?.data) return response.data;
  };

  addTeamMember = async (businessId: string) => {
    const response = await supabase
      .from(TEAM_INVITATIONS_TABLE)
      .insert({ business_id: businessId, email: "test@email.com" });

    return response;
  };
}

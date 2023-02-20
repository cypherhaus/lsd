import { Moment } from "moment";
import {
  AddBlockedTime,
  AddShift,
  BlockedTime,
  Shift,
} from "../../types/bookings";
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

  fetchShiftExceptions = async (userId: string) => {
    const { data, error } = await supabase
      .from("shift_exceptions")
      .select("*")
      .eq("user_id", userId);
    return data;
  };

  addShift = async ({ start, end, isoWeekday, user_id }: AddShift) => {
    const res = await supabase.from("shifts").upsert({
      start,
      end,
      isoWeekday,
      user_id,
    });

    console.log({ res });
  };

  updateShifts = async (newShifts: any) => {
    const res = await supabase.from("shifts").upsert(newShifts);

    console.log({ res });
  };

  deleteShiftOnce = async (id: string, date: Moment, userId?: string) => {
    if (!userId) return;
    const reso = await supabase
      .from("shift_exceptions")
      .insert({
        shift_id: id,
        shift_date: date.format(),
        user_id: userId,
      })
      .eq("id", id);
  };

  deleteShift = async (id: string) => {
    const res = await supabase.from("shifts").delete().eq("id", id);
  };

  addBlockedTime = async (blockedTime: AddBlockedTime) => {
    const res = await supabase.from("blocked_times").insert(blockedTime);

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
}

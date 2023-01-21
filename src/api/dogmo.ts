import moment, { Moment } from "moment";
import { supabase } from "../config/supabase";

export default class DogmoAPI {
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
}

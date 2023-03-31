/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { supabase } from "../config/supabase";
// Types
// Constants
import { PROFILES_TABLE } from "../constants/db";

export default class DashAPI {
  fetchProfile = async (id: string) => {
    const { data } = await supabase.from(PROFILES_TABLE).select().eq("id", id);
    if (data) return data[0];
    return false;
  };
}

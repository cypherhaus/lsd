import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { FC } from "react";
import { SupabaseContextProvider } from "use-supabase";

export const supabase: SupabaseClient = createClient(
  process.env.REACT_APP_SUPABASE_URL ?? "",
  process.env.REACT_APP_SUPABASE_KEY ?? ""
);

export const SupabaseWrapper: FC = ({ children }: any) => (
  // @ts-ignore
  <SupabaseContextProvider client={supabase}>
    {children}
  </SupabaseContextProvider>
);

import { ApiError, Session, User as SupaUser } from "@supabase/supabase-js";
// User credentials for local state
export interface User {
  email: string;
  token: string;
  username: string;
  userId: string;
  walletId: string;
  walletAdminKey: string;
}

export interface Charge {
  amount: string;
  callbackUrl: string;
  confirmedAt: string;
  createdAt: string;
  description: string;
  expiresAt: string;
  id: string;
  internalId: string;
  invoice: { request: string };
  status: string;
  unit: string;
}

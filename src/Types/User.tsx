import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface User extends SupabaseUser {
  hasPlaidConnection: boolean;
}

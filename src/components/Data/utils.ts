import { supabase } from "./supabase";

export async function summon(url: string, options?: RequestInit | undefined) {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;
  console.log("token", token);

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });
}

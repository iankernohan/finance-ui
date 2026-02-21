import { summon } from "./utils";

const base = import.meta.env.VITE_BASE;

export async function userHasConnection(userId: string): Promise<boolean> {
  const res = await summon(`${base}/User/UserHasConnection`, {
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  return data;
}

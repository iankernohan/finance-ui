import { summon } from "./utils";

const base = import.meta.env.VITE_API_BASE_URL;

export async function userHasConnection(userId: string): Promise<boolean> {
  const res = await summon(`${base}/User/UserHasConnection`, {
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  return data;
}

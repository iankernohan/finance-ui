import { useEffect, type SetStateAction } from "react";
import { usePlaidLink } from "react-plaid-link";
import { exchangePublicToken, fetchToken } from "../Data/data";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { useStore } from "../../store/store";

export default function PlaidConnection({
  userId,
  linkToken,
  setLinkToken,
}: {
  userId: string;
  linkToken: string | null;
  setLinkToken: React.Dispatch<SetStateAction<string | null>>;
}) {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    if (!linkToken) fetchToken(userId).then((data) => setLinkToken(data));
  }, [userId, linkToken, setLinkToken]);

  const onSuccess = async (public_token: string) => {
    const res = await exchangePublicToken(public_token, userId);
    if (res && user) {
      setUser({ ...user, hasPlaidConnection: true });
    }
    navigate("/");
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  return (
    <>
      <button
        style={{ display: "flex", gap: "1rem" }}
        onClick={() => open()}
        disabled={!ready}
      >
        <span>Connect your bank</span>
        {!ready && <CircularProgress size={"20px"} />}
      </button>
    </>
  );
}

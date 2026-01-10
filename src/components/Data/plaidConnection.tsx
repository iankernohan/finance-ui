import { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { exchangePublicToken, fetchToken } from "./data";

export default function PlaidConnect({ userId }: { userId: string }) {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    fetchToken(userId).then((data) => setLinkToken(data));
  }, [userId]);

  const onSuccess = async (public_token: string) => {
    await exchangePublicToken(public_token, userId);
    alert("Bank linked!");
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  return (
    <>
      <button onClick={() => open()} disabled={!ready}>
        Connect your bank
      </button>
      {ready && <div>ready</div>}
    </>
  );
}

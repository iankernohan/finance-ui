import { Box } from "@mui/material";
import { useState } from "react";
import { useStore } from "../../store/store";
import LittleGuy from "../../assets/limbless-guy.png";
import PlaidConnection from "./plaidConnection";

export default function NoPlaidConnection() {
  const [connect, setConnect] = useState(false);
  const user = useStore((state) => state.user);
  const [linkToken, setLinkToken] = useState<string | null>(null);

  return (
    <Box
      id="hello"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem 1rem",
      }}
    >
      <Box sx={{ display: "grid", gap: "1rem" }}>
        <h1
          style={{
            fontWeight: 200,
            fontSize: "1.75rem",
            textAlign: "center",
          }}
        >
          Welcome, {user?.email}.
        </h1>
        <Box sx={{ margin: "auto" }}>
          <img
            style={{
              width: "100px",
              height: "100px",
              zIndex: 0,
            }}
            src={LittleGuy}
          />
        </Box>
        {connect && user ? (
          <PlaidConnection
            linkToken={linkToken}
            setLinkToken={setLinkToken}
            userId={user.id}
          />
        ) : (
          <button onClick={() => setConnect(true)}>Begin</button>
        )}

        <p style={{ fontWeight: 300, textAlign: "center" }}>
          Click above to begin connecting to your bank
        </p>
      </Box>
    </Box>
  );
}

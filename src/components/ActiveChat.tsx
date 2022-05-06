import { Avatar, Box, Card, SvgIcon, Tooltip } from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth0 } from "@auth0/auth0-react";

function ActiveChat({ currentUser }: { currentUser: string }) {
  const { logout } = useAuth0();
  return (
    <>
      <Card
        elevation={0}
        square
        sx={{
          height: "8rem",
          maxWidth: "100rem",
          minWidth: "40rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0rem 1rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ marginRight: "1rem" }} />
          <p>{currentUser}</p>
        </Box>
        <Tooltip placement="top" title={"Logout"}>
          <SvgIcon
            onClick={() => logout({ returnTo: window.location.origin })}
            sx={{
              cursor: "pointer",
              color: "f7f7f7",
              margin: "0rem 10rem",
              fontSize: "2rem",
              border: "solid",
              borderRadius: "50%",
              padding: "0.4rem",
            }}
          >
            <LogoutIcon />
          </SvgIcon>
        </Tooltip>
      </Card>
    </>
  );
}

export default ActiveChat;

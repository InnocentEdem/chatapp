import { Alert, AlertTitle, Box, CssBaseline, Snackbar, SnackbarOrigin } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chats from "./components/Chats";
import Api from "./components/services/api";
import { IMessageEvent, w3cwebsocket as W3CWebsocket } from "websocket";
import { useAuth0 } from "@auth0/auth0-react";
import ActiveChat from "./components/ActiveChat";
import useFetchMetaData from "./hooks/useFetchMetadata";
import Contacts from "./components/Contacts";

interface IMessage {
  createdAt: Date;
  id: number;
  msg_text: string;
  sent_by: string;
  sent_to: string;
  updatedAt: Date;
}
export interface State extends SnackbarOrigin {
  open: boolean;
}

function PreAuthorization({ client,refresh }: { client?: any, refresh?:any }) {
  const {
    user,

  } = useAuth0();

  const [messages, setMessages] = useState<IMessage[]>();
  const [usersOnline, setUsersOnline] = useState<string[]>();
  const sent_by = user?.email;
  const [sent_to, setSent_to] = useState<string>("");
  const [messageString, setMessageString] = useState<string>("");
  const [activeChat, setActiveChat] = useState(0);
  const [usersBlockedByCurrentUser, setUsersBlockedByCurrentUser] = useState<string[]>()
  const [snackbarState, setSnackbarState] = useState({open:false, message:"",severity:0,title:""})


  const handleClose =()=>{
    setSnackbarState(prev=>{return{...prev,open:false}})
  }
  const handleSnackAlert=(message:string,severity:number,title:string)=>{

    setSnackbarState(prev=>{return{...prev,open:true,message,severity,title}})
    setTimeout(()=>{
      handleClose()
    },3000)

  }
  
  //message utilities
  const setRecipientEmail = (value: string) => {
    setSent_to(value);
  };

  const sendNewMessage = (value: string) => {

  };

  const fetchOneChat = (_value: string) => {
  };
  const fetchAllUserMessages = () => {
    const _payload = { email: sent_by };
    const _action = "fetch_all_user_messages";
  };

  const blockUser = (userEmail: string) => {
    const _payload = { blocked_by: user?.email, user_blocked: userEmail };
    const _action = "block_user";

  };
  const unBlockUser = (userEmail: string) => {
    const _payload = { blocked_by: user?.email, user_blocked: userEmail };
    const _action = "unblock_user";
  };

  return (
    <>
      <Box sx={{ display: "flex", position: "fixed", width: "100%" }}>
        <Box sx={{ width: "30%" }}>
        <Box sx={{fontSize:"2.5rem",color:"tomato",display:"flex",width:"100%", justifyContent:"center",marginTop:"20vh",marginRight:"-900vw"}}>
                  Authorizing.........
                  </Box>
    
        </Box>
        <Box sx={{ }}>
          <ActiveChat currentUser={sent_to} />
          <Chats
            messages={messages}
            messageString={messageString}
            sendNewMessage={sendNewMessage}
            handleSnackAlert = {handleSnackAlert}
          />
        </Box>
        <Snackbar
        anchorOrigin={{ vertical:"top" , horizontal:"center" }}
        open={snackbarState.open}
        onClose={handleClose}
      >
        <Alert severity={snackbarState.severity === 1? "error":"success"}>
        <AlertTitle>{snackbarState?.title}</AlertTitle>
         {snackbarState.message}
        </Alert>
      </Snackbar>
      </Box>
    </>
  );
}

export default PreAuthorization;

import { Alert, AlertTitle, Box, CssBaseline, Snackbar, SnackbarOrigin } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chats from "./components/Chats";
import Api from "./components/services/api";
import { IMessageEvent, w3cwebsocket as W3CWebsocket } from "websocket";
import { useAuth0 } from "@auth0/auth0-react";
import ActiveChat from "./components/ActiveChat";
import useFetchMetaData from "./hooks/useFetchMetadata";
import Contacts from "./components/Contacts";
import { SettingsRemoteSharp } from "@mui/icons-material";

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

function ChatPageLayout({ client,refresh }: { client?: any, refresh:any }) {
  const {
    user,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  const [messages, setMessages] = useState<IMessage[]>();
  const [usersOnline, setUsersOnline] = useState<string[]>();
  const sent_by = user?.email;
  const [sent_to, setSent_to] = useState<string>("");
  const [messageString, setMessageString] = useState<string>("");
  const [activeChat, setActiveChat] = useState(0);
  const [blockList, setBlockList] = useState<string[]|undefined>();
  const [usersBlockedByCurrentUser, setUsersBlockedByCurrentUser] = useState<string[]>()
  const [snackbarState, setSnackbarState] = useState({open:false, message:"",severity:0,title:""})
  const [tries,setTries] = useState(0)
  const [connected, setConnected] = useState(false)


  const handleClose =()=>{
    setSnackbarState(prev=>{return{...prev,open:false}})
  }
  const handleSnackAlert=(message:string,severity:number,title:string)=>{

    setSnackbarState(prev=>{return{...prev,open:true,message,severity,title}})
    setTimeout(()=>{
      handleClose()
    },3000)

  }
  
  client.onopen = () => {
    setTries(5)    
    setConnected(true)
  };
  client.onmessage = (message: any) => {
    console.log("message received");
    console.log(message);


    const newMessage = JSON.parse(message?.data);
    console.log(message);
    
    if (newMessage.category === "users_update") {
      const filter1 = newMessage?.usersOnline.filter((e: string) => e !== user?.email)
      const filter2 = filter1?.filter((e: string) => !blockList?.includes(e))
      setUsersOnline(filter2)
    } else if (newMessage.category === "block_list") {
      const filtered = newMessage.blockList.map(
        (element: any) => element.blocked_by
      );
      setBlockList([...filtered]);
    } else if(newMessage.category === "block_list_for_blocker"){
      setUsersBlockedByCurrentUser(newMessage?.blockListForBlocker?.map((element:any)=>element.user_blocked))
            
    }
     else if(newMessage.category === "do_not_sleep"){
        console.log("Sleeping aint ma kinda thing");
                    
    }
    else{
      setMessages(newMessage);
    }
  };

  client.onclose = () => {
    setConnected(false)
    handleSnackAlert("Your connection was terminated",
        1,"Connection Error"
      )
      // refresh()
      window.location.reload()
      
  };

  //message utilities
  const setRecipientEmail = (value: string) => {
    setSent_to(value);
  };

  const sendNewMessage = (value: string) => {
    if (value && sent_to) {
      const payload = { sent_by, sent_to, msg_text: value };
      const action = "send_new_message";

      client.send(JSON.stringify({ payload, action }));
    } else {
      handleSnackAlert("Select a User and enter some text to start chatting",
        1,"Message Error"
      )
    }
  };

  const fetchOneChat = (value: string) => {
    if (sent_by && value) {
      setSent_to(value);
      const payload = { sent_by, sent_to: value };
      const action = "fetch_one_chat";
      client.send(JSON.stringify({ payload, action }));
    }
  };
  const fetchAllUserMessages = () => {
    const payload = { email: sent_by };
    const action = "fetch_all_user_messages";
    client.send({ payload, action });
  };

  const blockUser = (userEmail: string) => {
    const payload = { blocked_by: user?.email, user_blocked: userEmail };
    const action = "block_user";

    if (payload?.blocked_by && payload?.user_blocked) {
      client.send(JSON.stringify({ payload, action }));
      handleSnackAlert(`${userEmail} blocked`,
        0,"Block User"
      )
    }
  };
  const unBlockUser = (userEmail: string) => {
    const payload = { blocked_by: user?.email, user_blocked: userEmail };
    const action = "unblock_user";
    if (payload?.blocked_by && payload?.user_blocked) {
      client.send(JSON.stringify({ payload, action }));
      handleSnackAlert(`${userEmail} unblocked`,
        0,"Unblock User"
      )
    }
  };


  useEffect(()=>{
    console.log("sent");

    const interval = setInterval(() => {
      client.send(
        JSON.stringify({action:"do_not_sleep"})
      )
    },2000)
    return () => clearInterval(interval);
  },[]);

  return (
    <>
      <Box sx={{ display: "flex", position: "fixed", width: "100%" }}>
        <Box sx={{ width: "30%" }}>
          <Contacts
            contactList={usersOnline}
            fetchOneChat={fetchOneChat}
            setRecipientEmail={setRecipientEmail}
            blockUser={blockUser}
            blockList={usersBlockedByCurrentUser}
            unBlockUser = {unBlockUser}
          />
        </Box>
        <Box sx={{ width: "70%" }}>
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

export default ChatPageLayout;

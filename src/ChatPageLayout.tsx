import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  CssBaseline,
  Snackbar,
  SnackbarOrigin,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Chats from "./components/Chats";
import { useAuth0 } from "@auth0/auth0-react";
import ActiveChat from "./components/ActiveChat";
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

function ChatPageLayout({ client }: { client?: any }) {
  const { user } = useAuth0();

  const [messages, setMessages] = useState<IMessage[]>();
  const [usersOnline, setUsersOnline] = useState<string[]>();
  const sent_by = user?.email;
  const [sent_to, setSent_to] = useState<string>("");
  const [messageString, setMessageString] = useState<string>("");
  const [blockList, setBlockList] = useState<string[] | undefined>();
  const [usersBlockedByCurrentUser, setUsersBlockedByCurrentUser] =
    useState<string[]>();
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: 0,
    title: "",
  });
  const [receipt, setReceipt] = useState<string[]>([])

  const handleClose = () => {
    setSnackbarState((prev) => {
      return { ...prev, open: false };
    });
  };
  const handleSnackAlert = (
    message: string,
    severity: number,
    title: string
  ) => {
    setSnackbarState((prev) => {
      return { ...prev, open: true, message, severity, title };
    });
    setTimeout(() => {
      handleClose();
    }, 3000);
  };  

  client.onopen = () => {
    console.log("connected");
  };
  client.onmessage = (message: any) => {

    const newMessage = JSON.parse(message?.data);
    
    if (newMessage.category === "users_update") {
      const filter1 = newMessage?.usersOnline.filter(
        (e: string) => e !== user?.email
      );
      const filter2 = filter1?.filter((e: string) => !blockList?.includes(e));
      setUsersOnline(filter2);
      
    } 
    else if (newMessage.category === "block_list") {
      const filtered = newMessage.blockList.map(
        (element: any) => element.blocked_by
      );
      setBlockList([...filtered]);      
    } 
    else if (newMessage.category === "block_list_for_blocker") {
      setUsersBlockedByCurrentUser(
        newMessage?.blockListForBlocker?.map(
          (element: any) => element.user_blocked
        )
      );      
    } 
    else if (newMessage.category === "message") {
        setMessages(newMessage?.content)

    } 
    else if (newMessage.category === "sent_success") {
      if(sent_to===newMessage.category.sent_to){
        fetchOneChat(sent_to)
      }
    } 
    else if(newMessage.category==="new_message"){

      if(newMessage.sent_by === sent_to){
        fetchOneChat(newMessage.sent_by)
      }else{
        setReceipt(prev=>{return [...prev,newMessage.sent_by]})
      }
    } 
    else if(newMessage.category==="keep_alive"){      
      client.send(JSON.stringify({payload:user?.email, action:"keep_alive"}))      
    }
  };

  client.onclose = () => {
    handleSnackAlert("Your connection was terminated", 1, "Connection Error");
    window.location.reload();
  };

  //message utilities
  const setRecipientEmail = (value: string) => {
    setSent_to(value);
    handleRead(value)
  };

  const sendNewMessage = (value: string) => {
    if (value && sent_to) {
      const payload = { sent_by, sent_to, msg_text: value };
      const action = "send_new_message";

      client.send(JSON.stringify({ payload, action }));
      fetchOneChat(sent_to)
    } else {
      handleSnackAlert(
        "Select a User and enter some text to start chatting",
        1,
        "Message Error"
      );
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
      handleSnackAlert(`${userEmail} blocked`, 0, "Block User");
    }
  };
  const unBlockUser = (userEmail: string) => {
    const payload = { blocked_by: user?.email, user_blocked: userEmail };
    const action = "unblock_user";
    if (payload?.blocked_by && payload?.user_blocked) {
      client.send(JSON.stringify({ payload, action }));
      handleSnackAlert(`${userEmail} unblocked`, 0, "Unblock User");
    }
  };
  const fetchChatOnFirstLoad = () =>{
    setTimeout(()=>{
        if(usersOnline?.length){
          fetchOneChat(usersOnline[0])
        }
    },2000)
  }
  const handleRead = (email:string)=>{
    setReceipt(prev => prev.filter(element=> element !==email ))
  }

  // useEffect(() => {
    // fetchChatOnFirstLoad()
    

    // const interval = setInterval(() => {
    //   client.send(JSON.stringify({ action: "do_not_sleep" }));
    // }, 5000);
    // return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <Box sx={{ display: "flex", position: "fixed", width: "80vw", }}>
        <Box sx={{ }}>
          <Contacts
            newMessageList={receipt}
            contactList={usersOnline}
            fetchOneChat={fetchOneChat}
            setRecipientEmail={setRecipientEmail}
            blockUser={blockUser}
            blockList={usersBlockedByCurrentUser}
            unBlockUser={unBlockUser}
            newUnread={receipt}
          />
        </Box>
        <Box sx={{width:"80%"}}>
          <ActiveChat currentUser={sent_to} />

            <Chats
              messages={messages}
              messageString={messageString}
              sendNewMessage={sendNewMessage}
              handleSnackAlert={handleSnackAlert}
            />

        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbarState.open}
          onClose={handleClose}
        >
          <Alert severity={snackbarState.severity === 1 ? "error" : "success"}>
            <AlertTitle>{snackbarState?.title}</AlertTitle>
            {snackbarState.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

export default ChatPageLayout;

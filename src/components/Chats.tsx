import { Box, FormControl, TextField } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import SendIcon from '@mui/icons-material/Send';
import SentChatText from './ReceivedChatText';
import ReceivedChatText from './SentChatText';
import { useAuth0 } from "@auth0/auth0-react";


interface IMessage {
    createdAt: Date;
    id: number;
    msg_text: string;
    sent_by: string;
    sent_to: string;
    updatedAt: Date;
}



function Chats({
  messages,
  messageString,
  sendNewMessage,
  handleSnackAlert
}: {
  messages?: IMessage [];
  messageString: string;
  sendNewMessage:any
  handleSnackAlert:any;
}) {
  const [messageValue, setMessageValue] = useState("")
  const {user} = useAuth0()
  const chatRef = useRef<HTMLDivElement>(null)
  const sendRef = useRef(null)


  const  handleMessageInput = (event:any)=>{
    setMessageValue(event.target.value)
  }

  const handleKeyPress=(e:any)=>{    
    if(e.key ==="Enter"){
      sendNewMessage(messageValue)
      setMessageValue("")
    }
  }
  useEffect(()=>{
  
  })
  
 useEffect(()=>{
   const scroll =()=>{
    if(chatRef.current){
      chatRef.current.scrollIntoView({ block: "end", inline: "nearest"})
    }
   }
   scroll()
 
 },[messages])
  return (
    <Box
      style={{
        position: "relative",
        maxWidth: "100rem",
        minWidth: "40rem",
        // marginBottom:"300vh"
      }}
    >
      <Box sx={{ height: "73vh", overflowY: "scroll" }}>
        <div ref={chatRef}>
        {messages?.length &&
          messages.map((element:IMessage)=>(
            <>
            {element?. sent_by===user?.email &&
            (<SentChatText key = {element?.id} chat ={element}/>)
            }
            {
              element?. sent_by!==user?.email &&
              (<ReceivedChatText key={element?.id} chat ={element}/>)
            }
            </>
          ))
        }
        </div>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "73vh",
          left: "0vw",
          width: "94%",
          display: "flex",
          justifyContent: "center",
          zIndex: "100",
          backgroundColor: "#f7f7f7",
          marginRight:"10vw"
        }}
      >
        <FormControl sx={{ width: "30vw", margin: "4rem" }}>
          <TextField 
          inputRef={sendRef}
          onChange={handleMessageInput} 
          onKeyUp={handleKeyPress}
          value={messageValue} />
        </FormControl>

        <SendIcon
          sx={{ fontSize: "4.5rem", margin: "auto 0.5rem", cursor: "pointer" }}
          onClick={()=>{sendNewMessage(messageValue); setMessageValue("")}}
        />
      </Box>
    </Box>
  );
}

export default Chats;

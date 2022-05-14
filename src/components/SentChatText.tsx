import { Box, Card } from '@mui/material'
import React from 'react'

interface IMessage {
    createdAt: Date;
    id: number;
    msg_text: string;
    sent_by: string;
    sent_to: string;
    updatedAt: Date;
}

function SentChatText({chat}:{chat:IMessage}) {

 
  return (
      <Box sx={{width:"100%",height:"auto"}}>
          <Box 
          sx={{padding:"2rem",margin:"0rem",display:"flex",justifyContent:"flex-end"}}
          >
              <p style ={{padding:"1rem", border:"solid 1px green",margin:"0", 
              borderRadius:"1rem 1rem 0rem 1rem",width:"auto", minWidth:"20rem",
               backgroundColor:"rgba(203, 244, 231, 0.2)",fontSize:"1.6rem",
               maxWidth:"50rem",marginRight:"0rem"
               }}>
                 {chat.msg_text}
                 <Box sx={{display:"flex",justifyContent:"flex-end",marginTop:"2rem"}}>
                  <Box sx={{fontSize:"1rem"}}>{new Date(chat.createdAt).toUTCString()}</Box>
                  </Box>
              </p>
          </Box>
      </Box>
  )
}

export default SentChatText
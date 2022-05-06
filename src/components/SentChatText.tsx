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

    const test = "come home ronnie ghjkl ghjk ghjkldfgh "
    const time = new Date().toUTCString()
  return (
      <Box sx={{width:"100%",height:"auto"}}>
          <Box 
          sx={{padding:"2rem",margin:"0rem",display:"flex",justifyContent:"flex-start"}}
          >
              <p style ={{padding:"1rem", border:"solid 1px green",margin:"0", borderRadius:"1rem 1rem 1rem 0",width:"auto", minWidth:"20rem", backgroundColor:"",}}>
                 {chat?.msg_text}
                 <Box sx={{display:"flex",justifyContent:"flex-end",marginTop:"2rem"}}>
                  <Box>{new Date(chat.updatedAt).toUTCString()}</Box>
                  </Box>
              </p>
            

          </Box>
          
      </Box>
  )
}

export default SentChatText
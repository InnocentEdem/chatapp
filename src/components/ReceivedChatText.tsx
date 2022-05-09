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

function ReceivedChatText({ chat }: { chat: IMessage }) {


    return (
        <Box sx={{ width: "100%", height: "auto" }}>
            <Box
                sx={{ padding: "2rem", margin: "0rem", display: "flex", justifyContent: "flex-start" }}
            >
                <p style={{ padding: "1rem", border: "solid 1px green", margin: "0", borderRadius: "1rem 1rem 1rem 0", width: "auto", minWidth: "20rem", fontSize:"1.6rem", backgroundColor: "rgba(44, 247, 183,0.2)" }}>
                    {chat?.msg_text}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
                        <Box sx={{fontSize:"1rem"}}>{new Date(chat.updatedAt).toUTCString()}</Box>
                    </Box>
                </p>


            </Box>

        </Box>
    )
}

export default ReceivedChatText
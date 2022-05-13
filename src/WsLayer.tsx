import React, { useEffect, useState } from 'react'
import ChatPageLayout from './ChatPageLayout'
import {w3cwebsocket as W3CWebsocket } from "websocket";
import { useAuth0 } from '@auth0/auth0-react';
import Api from "./components/services/api"
import useFetchMetaData from "./hooks/useFetchMetadata";
import { Box } from '@mui/material';
import PreAuthorization from './PreAuthorization';
const Http = new XMLHttpRequest()




function WsLayer() {
  const { getAccessTokenSilently } = useAuth0()
  const [ready, setReady] = useState(false)
   const [token, setToken] = useState("");
  //  const userMetaData = useFetchMetaData()
  //  const [verified, setVerified] = useState(false)


  const handleLiveMessages = async () => {
    try {
      const newToken = await getAccessTokenSilently({
        audience: "localhost:5003",
        scope: "read:users,read:current_user,read:user_idp_tokens",
      });
      await Api("https://rgt-chatapp.herokuapp.com/", newToken).get("/authorized");
      setToken(newToken)
    } catch (err) {
      console.log(err);

    }
  }


  const connect = () =>{

    return new W3CWebsocket(
      `wss://rgt-chatapp.herokuapp.com/websockets?check=${token}`,
      
    );
  }
 
      useEffect(()=>{
        handleLiveMessages()
      },[])

  return (
    <>
    {token && <ChatPageLayout client = {connect()}/>}
    {!token && <PreAuthorization/>}
    </>
  )
}

export default WsLayer



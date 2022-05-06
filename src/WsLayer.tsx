import React, { useEffect, useState } from 'react'
import ChatPageLayout from './ChatPageLayout'
import { IMessageEvent, w3cwebsocket as W3CWebsocket } from "websocket";
import { useAuth0 } from '@auth0/auth0-react';
import Api from "./components/services/api"
import useFetchMetaData from "./hooks/useFetchMetadata";
import { Box } from '@mui/material';
import PreAuthorization from './PreAuthorization';




function WsLayer() {
 const {getAccessTokenSilently} = useAuth0()
 const [token, setToken] = useState("");
 const userMetaData = useFetchMetaData()
 const [verified, setVerified] = useState(false)





    const show = async () => {
      const newToken = await getAccessTokenSilently({
        audience: `localhost:5003`,
        scope: "read:current_user",
      });
      
      setToken(newToken);      
    };


    const handleLiveMessages =  () => {
      console.log(token);
      
        
    const client = new W3CWebsocket(`ws://rgt-chatapp.herokuapp.com/websockets?check=${token}`);  
      return client
    };
      
      const registerToken = async () => {        
        try {
          const accessToken = await getAccessTokenSilently({
            audience: `localhost:5003`,
            scope: "read:current_user",
          });
          
          await Api("http://rgt-chatapp.herokuapp.com", accessToken).get("/authorized");
          setVerified(true)
        } catch (err) {}
      };
      useEffect(()=>{
        show();
        registerToken()
        // handleLiveMessages()

      },[])


  return (
    <>
    {verified && <ChatPageLayout client = {handleLiveMessages()} refresh = {show}/>}
    {!verified && <PreAuthorization/>}
    </>
  )
}

export default WsLayer



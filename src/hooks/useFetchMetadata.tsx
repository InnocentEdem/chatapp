import React, {useEffect,useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function useFetchMetaData  (){

    const{user, getAccessTokenSilently} = useAuth0()
    const [userMetaData, setUserMetadata] = useState()

    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = "dev-ae4gvrfj.us.auth0.com";
    
          try {
            const accessToken = await getAccessTokenSilently({
              audience: `https://dev-ae4gvrfj.us.auth0.com/api/v2/`,
              scope: "read:current_user",
            });
    
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
    
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
    
            const { user_metadata } = await metadataResponse.json();
              console.log(metadataResponse);
              
            setUserMetadata(user_metadata);
          } catch (e) {
            console.log(e);
          }
        };
    
        getUserMetadata();
      }, [getAccessTokenSilently, user?.sub]);

      return userMetaData

}
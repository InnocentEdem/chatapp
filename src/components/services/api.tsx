import axios from "axios"

export default (baseuri:string,token:string ) => {

    console.log(token);
    
    return axios.create({
        baseURL: baseuri,
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
            // authorization: authToken ? `Bearer ${authToken}` : null
        }
    })
}

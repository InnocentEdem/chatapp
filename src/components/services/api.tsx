import axios from "axios"

export default (baseuri:string,token:string ) => {
    
    return axios.create({
        baseURL: baseuri,
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: token ? `Bearer ${token}` : ''
        }
    })
}

import axios from "axios";
const BASEURL = import.meta.env.VITE_BASEURL;
const HEADERS = {headers:{'content-type':'application/json'}};

export const loginService = async(payload) =>{
    try{
        const response = await axios.post(`${BASEURL}authentication/login`, payload, HEADERS);
        if(response.status!==200){
            return Promise.reject(response.statusText);
        }
        if(response.data.status!==200){
            return Promise.reject(response.data.msg);
        }
        sessionStorage.setItem('isAdmin', response.data.result.isAdmin);
        sessionStorage.setItem('token', response.data.result.token);
        sessionStorage.setItem('userId', response.data.result.userId);
        return Promise.resolve(response.data.msg)
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}
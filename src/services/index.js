import axios from "axios";
const BASEURL = import.meta.env.VITE_BASEURL;
export const getResponse = async (ep)=>{
    try{
        const token = sessionStorage.getItem('token');
        const CONFIG = {headers:{'content-type':'application/json', token}};
        const response = await axios.get(BASEURL+ep, CONFIG);
        if(response.status!==200){
            return Promise.reject(response.statusText);
        }
        if(response.data.status!==200){
            return Promise.reject(response.data.msg);
        }
        return Promise.resolve(response.data);
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const postResponse = async (ep, payload)=>{
    try{
        const token = sessionStorage.getItem('token');
        const CONFIG = {headers:{'content-type':'application/json', token}};
        const response = await axios.post(BASEURL+ep, payload, CONFIG);
        if(response.status!==200){
            return Promise.reject(response.statusText);
        }
        if(response.data.status!==200){
            return Promise.reject(response.data.msg);
        }
        console.log(response.data)
        return Promise.resolve(response.data);
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const deleteResponse = async (ep)=>{
    try{
        const token = sessionStorage.getItem('token');
        const CONFIG = {headers:{'content-type':'application/json', token}};
        const response = await axios.delete(BASEURL+ep, CONFIG);
        if(response.status!==200){
            return Promise.reject(response.statusText);
        }
        if(response.data.status!==200){
            return Promise.reject(response.data.msg);
        }
        return Promise.resolve(response.data);
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}
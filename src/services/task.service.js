import { getResponse, postResponse } from ".";

export const getTaskFromLeadId = async(leadid) =>{
    try{
        const { tasks, msg } = await getResponse(`task?leadid=${leadid}`);
        return Promise.resolve({tasks, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const getTaskFromOpportuniyId = async(opportinityid) =>{
    try{
        const { tasks, msg } = await getResponse(`task?opportinityid=${opportinityid}`);
        return Promise.resolve({tasks, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const createTask = async(payload) =>{
    try{
        const { msg } = await postResponse(`task`, payload);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}
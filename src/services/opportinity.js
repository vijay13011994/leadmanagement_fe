import { deleteResponse, getResponse, postResponse } from ".";

export const getOpportinities = async(query) =>{
    try{
        const { opportunities, msg } = await getResponse(`opportinity${query?query:''}`);
        return Promise.resolve({opportunities, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const createOpportinity = async(payload) =>{
    try{
        const { msg } = await postResponse(`opportinity`, payload);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const deleteOpportinity = async(id) =>{
    try{
        const { msg } = await deleteResponse(`opportinity/${id}`);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const getOpportinityById = async(id) =>{
    try{
        const { opportunity, msg } = await getResponse(`opportinity/${id}`);
        return Promise.resolve({opportunity, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const getOpportinityByAccountIdService = async(id) =>{
    try{
        const { opportunities, msg } = await getResponse(`opportinity/account/${id}`);
        return Promise.resolve({opportunities, msg});
    }catch(e){
        console.log(e);
        return Promise.reject('Something went wrong!');
    }
}
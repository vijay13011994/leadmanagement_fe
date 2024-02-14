import { deleteResponse, getResponse, postResponse } from ".";


export const getLeadList = async() =>{
    try{
        const { leads, msg } = await getResponse(`lead`);
        return Promise.resolve({leads, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const createLead = async(payload) =>{
    try{
        const { msg } = await postResponse(`lead`, payload);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const getLeadById = async(id) =>{
    try{
        const {lead, msg } = await getResponse(`lead/${id}`);
        return Promise.resolve({lead, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const deleteLeadService = async(id) =>{
    try{
        const { msg } = await deleteResponse(`lead/${id}`);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const getLeadByUserId = async(id) =>{
    try{
        const { leads, msg } = await getResponse(`lead/owner/${id}`);
        return Promise.resolve({leads, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}
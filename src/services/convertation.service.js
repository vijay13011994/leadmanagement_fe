import { getResponse, postResponse } from ".";


export const getConversationListService = async(id) =>{
    try{
        const { convertations, msg } = await getResponse(`convertation/contact/${id}`);
        return Promise.resolve({convertations, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const createConversationService = async(payload) =>{
    try{
        const { msg } = await postResponse(`convertation`, payload);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}
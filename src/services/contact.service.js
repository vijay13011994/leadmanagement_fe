import { deleteResponse, getResponse, postResponse } from ".";


export const getContactListService = async() =>{
    try{
        const { contacts, msg } = await getResponse(`contact`);
        return Promise.resolve({contacts, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const getContactByIdService = async(id) =>{
    try{
        const { contact, msg } = await getResponse(`contact/${id}`);
        return Promise.resolve({contact, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const getContactListByAcccountIdService = async(id) =>{
    try{
        const { contacts, msg } = await getResponse(`contact/account/${id}`);
        return Promise.resolve({contacts, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const createContactService = async(payload) =>{
    try{
        const { msg } = await postResponse(`contact`, payload);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const deleteContactService = async(id) =>{
    try{
        const { msg } = await deleteResponse(`contact/${id}`);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}
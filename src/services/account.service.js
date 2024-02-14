import { deleteResponse, getResponse, postResponse } from ".";


export const getAccountListService = async() =>{
    try{
        const { accounts, msg } = await getResponse(`account`);
        console.log(accounts)
        return Promise.resolve({accounts, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const getAccountByIdService = async(id) =>{
    try{
        const { account, msg } = await getResponse(`account/${id}`);
        return Promise.resolve({account, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const createAccountService = async(payload) =>{
    try{
        const { msg } = await postResponse(`account`, payload);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const deleteAccountService = async(id) =>{
    try{
        const { msg } = await deleteResponse(`account/${id}`);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}
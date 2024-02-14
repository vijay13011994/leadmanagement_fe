import { deleteResponse, getResponse, postResponse } from ".";


export const createUser = async(payload) =>{
    try{
        const { msg } = await postResponse(`user`, payload);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const getAllUsers = async() =>{
    try{
        const { users, msg } = await getResponse(`user`);
        return Promise.resolve({users, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const getUserById = async(id) =>{
    try{
        const { users, msg } = await getResponse(`user/${id}`, );
        return Promise.resolve({users, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const deleteUserById = async(id) =>{
    try{
        const { msg } = await deleteResponse(`user/${id}`, );
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const changePassword = async(payload) =>{
    try{
        const { msg } = await postResponse(`user/change_password`, payload );
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const getDashboardDataService = async() =>{
    try{
        const { data, msg } = await getResponse(`user/get_dashboard_data`);
        return Promise.resolve({data, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}



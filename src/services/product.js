import { deleteResponse, getResponse, postResponse } from ".";

export const getProducts = async() =>{
    try{
        const { products, msg } = await getResponse(`product`);
        return Promise.resolve({products, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const createProduct = async(payload) =>{
    try{
        const { msg } = await postResponse(`product`, payload);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const deleteProduct = async(id) =>{
    try{
        const { msg } = await deleteResponse(`product/${id}`);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}
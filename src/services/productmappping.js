import { deleteResponse, getResponse, postResponse } from ".";

export const getMappedProducts = async() =>{
    try{
        const { tasks, msg } = await getResponse(`productmapping`);
        return Promise.resolve({tasks, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const getMappedProductsByOppId = async(id) =>{
    try{
        const { mappedProducts, msg } = await getResponse(`productmapping/byoppid/${id}`);
        return Promise.resolve({mappedProducts, msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}


export const deleteMappedProducts = async(id) =>{
    try{
        const { msg } = await deleteResponse(`productmapping/${id}`);
        return Promise.resolve({ msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}

export const mapProduct = async(payload) =>{
    try{
        const { msg } = await postResponse(`productmapping`, payload);
        return Promise.resolve({msg});
    }catch(e){
        return Promise.reject('Something went wrong!');
    }
}
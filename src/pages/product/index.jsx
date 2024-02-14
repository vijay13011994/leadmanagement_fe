import React, { useEffect } from 'react'
import ProductTable from './table'
import CreateProduct from './form/create-product';
import { getProducts } from '../../services/product';

export default function Product() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);

  const getAllProducts = async ()=>{
    try{
      const {products} = await getProducts();
      setData(products);
    }catch(e){
      alert(e);
    }
  };

  useEffect(()=>{
    getAllProducts()
  }, []);

  return (
    <>
      <center><h2 style={{textDecoration:'underline'}}>PRODUCTS</h2></center>
      <ProductTable rows={data} getAllProducts={getAllProducts} setOpen={setOpen}/>
      <CreateProduct open={open} setOpen={setOpen} getAllProducts={getAllProducts}/>
    </>
  )
}

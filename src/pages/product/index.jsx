import React, { useEffect, useState } from 'react'
import ProductTable from './table'
import CreateProduct from './form/create-product';
import { getProducts } from '../../services/product';
import EditProduct from './form/edit-product';

export default function Product() {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [product, setProduct] = useState(null);
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
      <ProductTable rows={data} setOpen={setOpen} setOpenEdit={setOpenEdit} setProduct={setProduct}/>
      <CreateProduct open={open} setOpen={setOpen} getAllProducts={getAllProducts}/>
      <EditProduct open={openEdit} setOpen={setOpenEdit} getAllProducts={getAllProducts} product={product}/>
    </>
  )
}

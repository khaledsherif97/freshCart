import React, { useContext, useEffect, useState } from 'react'
import styles from './Products.module.css'
import axios from 'axios'
import { CirclesWithBar } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import { WishContext } from '../../Context/WishContext'
import toast from 'react-hot-toast'


const Products = () => {

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
   
    
  }

  let {data,isLoading}= useQuery('products',getProducts)
  let {addToCart,setNumOfCartItems}=useContext(cartContext)
  let {addToWishList}=useContext(WishContext)

async function addCart(id) {
  let res= await addToCart(id);
  console.log(res.data.status );
  if(res.data.status=="success"){
    toast.success("product successfully")
    setNumOfCartItems(res.data.numOfCartItems)
  }else{
    toast.error("added error")
  }
  
}
async function addWish(id) {
  let res= await addToWishList(id);
  //console.log(res.data.status );
  if(res.data.status=="success"){
    toast.success("product added to wish list successfully")
  }else{
    toast.error("added error")
  }
  
}

  return (<>
  <div className='container py-5 '>
    
      {isLoading?<CirclesWithBar
  height="100"
  width="100"
  color="#4fa94d"
  outerCircleColor="#4fa94d" 
  innerCircleColor="#4fa94d"
  barColor="#4fa94d"
  ariaLabel="circles-with-bar-loading"
  wrapperStyle={{}}
  wrapperClass="justify-content-center"
  visible={true}
  />:<div className="row">
{data?.data?.data.map((pro)=>  <div key={pro.id} className="col-md-3 col-sm-4 ">
       
        <div className="product py-3 px-3 position-relative">
        <Link to={'/productDetails/'+pro.id}>
          <img className='w-100' src={pro.imageCover} alt={pro.title}/>
          <p className='text-main'>{pro.category.name}</p>
          <h3 className='h5'>{pro.title.split(' ').slice(0,3).join(" ")}</h3>
          <div className="d-flex justify-content-between">
            <p>{pro.price}EGP</p>
            <p>
              <i className='fa fa-star rating-color'></i>
              {pro.ratingsAverage}
            </p>
          
          </div>
          </Link>
          <i onClick={()=>addWish(pro.id)} className=" fs-2  position-absolute end-0 pe-3  fa-solid fa-heart"></i>
          
          <button onClick={()=>addCart(pro.id)} className='btn bg-main text-white w-100 mt-5'>Add to cart</button>
        </div>
      
        
      </div>)}
  </div> }
    
    
    
    </div>

  
  
  
  
  </>
   
  )
}

export default Products
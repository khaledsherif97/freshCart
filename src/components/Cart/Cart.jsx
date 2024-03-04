import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { cartContext } from '../../Context/CartContext'
import { CirclesWithBar } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import CheckOut from '../CheckOut/CheckOut';

const Cart = () => {
  const[cartDetails,setCartDetails]=useState({})
 
  let{getCartDetails,removeItem,clearCart,updateItemCount,setNumOfCartItems}= useContext(cartContext)


 async function getCartData() {
  let {data}= await getCartDetails()
  //console.log(data);
  setNumOfCartItems(data?.numOfCartItems)
  setCartDetails(data)
 }
 async function updateCount(id,count) {
  let {data}= await updateItemCount(id,count)
  cartDetails.data.products.map(ele=>{
    if (ele.count===0) {
      removeItemData(ele.product._id)
    }

  }) 
 // console.log(data);
  setCartDetails(data)
 }
 async function removeItemData(id) {
  let {data}= await removeItem(id)
 // console.log(data);
 setNumOfCartItems(data?.numOfCartItems)
  setCartDetails(data)
 }
 async function removeAllData() {
  let {data}= await clearCart()
 // console.log(data);
 setNumOfCartItems(data?.numOfCartItems)
  setCartDetails(data)
 }

 useEffect(()=>{
  getCartData()
 },[])

  return (<>
  {cartDetails? <div> {cartDetails.data?  <div className='container my-5'>
  <div className='mx-auto bg-main-light p-5'>
    <h1>Cart Shop</h1>
    <div className="d-flex justify-content-between align-items-center pb-3">
      <h4>Total price :<span className='text-main'>{cartDetails.data.totalCartPrice} EGP</span></h4>
      <div>
        <Link to={'/CheckOut'} className='btn  rounded-pill  px-5 py-3 mb-2 ms-2 text-center text-white fw-bolder bg-main'>Check Out</Link>
      <h4>Total cart items :<span className='text-main'>{cartDetails.numOfCartItems}</span></h4>
      </div>
     
    </div>
    {cartDetails.data.products.map((ele)=> <div key={ele.product._id} className="row border-bottom py-3">
      <div className=" col-md-1">
        <img className='w-100' src={ele.product.imageCover} alt='' />
      </div>
      <div className="col-md-11 d-flex justify-content-between ">
        <div >
          <h3>{ele.product.title.split(' ').slice(0,8).join(" ")}</h3>
          <p className='h5 fw-semibold'>{ele.price} EGP</p>
          <button onClick={()=> removeItemData(ele.product._id)} className='btn text-danger p-0 text-start '> <i className='fa fa-trash-can'></i> Remove</button>
        </div>
        <div>
          <button onClick={()=>updateCount(ele.product._id,ele.count-1)} className='btn border border-3 bg-main'>-</button>
          <span className='px-2'>
            {ele.count}</span>
          <button onClick={()=>updateCount(ele.product._id,ele.count+1)} className='btn border border-3 bg-main'>+</button>
        </div>
       
      </div>
     
    </div>)}
    <button onClick={()=> removeAllData()} className='btn rounded-pill  border border-3 bg-main w-25 mx-auto my-3 py-3 fw-bold text-white fs-4'> Clear your cart</button>
  </div>
  
 </div>:<CirclesWithBar
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
  />} </div>: <div className='container py-5'>
    <div className='mx-auto bg-main-light p-5'>
      <h2 className='fw-bold text-main'>Your cart is empty</h2>
       <button className='btn rounded-pill bg-main py-3 px-4 mt-4 '><Link  className='text-white fw-bold' to={'/home'}>Go to home</Link></button>

    </div>
    </div>}
 
    </>)
}

export default Cart
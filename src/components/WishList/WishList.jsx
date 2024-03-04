import React, { useContext, useEffect, useState } from 'react'

import { CirclesWithBar } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { WishContext } from '../../Context/WishContext';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

const WishList = () => {
    const[listDetails,setListDetails]=useState({})
    let{getListDetails,removeItem}= useContext(WishContext)
    let {addToCart,setNumOfCartItems}=useContext(cartContext)

    async function addCart(id) {
        let res= await addToCart(id);
        console.log(res.data.status );
        if(res.data.status=="success"){
          toast.success("product successfully")
          setNumOfCartItems(res.data.numOfCartItems)
          removeItemData(id)
        }else{
          toast.error("added error")
        }
        
      }

    async function getListData() {
        let {data}= await getListDetails()
        console.log(data);
        setListDetails(data)
    }
    async function removeItemData(id) {
        let {data}= await removeItem(id)
       // console.log(data);
       setListDetails(data)
       }

useEffect(()=>{
    getListData()
   },[])

  return (<>
  {listDetails? <div>{listDetails.data?   <div className='container my-5'>
  
  <div className='mx-auto  bg-main-light p-5'>
  <h1 className='fw-bold'>My wish List</h1>
   {listDetails.data.map((ele)=> <div key={ele.id} className="row border-bottom py-5">
      <div className=" col-md-2">
        <img style={{height:"200px"}} className='w-100 ' src={ele.imageCover} alt='' />
      </div>
      <div className="col-md-10 d-flex justify-content-between ">
        <div >
          <h3>{ele.title}</h3>
          <p className='h5 fw-semibold'>{ele.price} EGP</p>
          <button onClick={()=> removeItemData(ele.id)}  className='btn text-danger p-0 text-start '> <i className='fa fa-trash-can'></i> Remove</button>
        </div>
        <button onClick={()=>addCart(ele.id)}  style={{height:"50px" ,width:"200px"}} className='btn bg-main text-white px-5'>Add to cart</button>
      </div>
     
    </div>)}
  
  
    </div> </div> :<CirclesWithBar
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
    /> } </div> : <div className='container py-5'>
    <div className='mx-auto bg-main-light p-5'>
      <h2 className='fw-bold text-main'>Your Wish List is empty</h2>
       <button className='btn rounded-pill bg-main py-3 px-4 mt-4 '><Link  className='text-white fw-bold' to={'/home'}>Go to home</Link></button>

    </div>
    </div>}
</>
  )
}

export default WishList
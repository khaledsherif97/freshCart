import axios from "axios";

const { createContext, useState, useEffect } = require("react");





export let cartContext= createContext();
let headers={
    token:localStorage.getItem("userToken")
}

 function addToCart(id) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId:id
    }, {
        headers:headers
    }).then((res)=>res).catch((err)=>err);
    
}

function updateItemCount(id,count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
          count:count
      }, {
          headers:headers
      }).then((res)=>res).catch((err)=>err);
      
  }
function removeItem(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
          headers:headers
      }).then((res)=>res).catch((err)=>err);
      
  }
  function clearCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
          headers:headers
      }).then((res)=>res).catch((err)=>err);
      
  }
function getCartDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
          headers:headers
      }).then((res)=>res).catch((err)=>err);
      
  }
  
export default function CartContextProvider(props){
let[cartId,setCartId] =useState(null)
let[numOfCartItems,setNumOfCartItems] =useState(0)
 
function onlinePay(shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        shippingAddress
      }, {
          headers:headers
      }).then((res)=>res).catch((err)=>err);
      
  }

async function getInitialCart() {
    let {data} =await getCartDetails();
setNumOfCartItems(data?.numOfCartItems)
setCartId(data?.data._id)
    
}

useEffect(()=>{
    getInitialCart();
},[])



return <cartContext.Provider value={{addToCart,getCartDetails,removeItem,clearCart,updateItemCount,onlinePay,numOfCartItems,setNumOfCartItems,cartId,setCartId}}>{props.children}</cartContext.Provider>;
}
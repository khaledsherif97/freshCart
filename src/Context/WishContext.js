import axios from "axios";

const { createContext } = require("react");

export let WishContext= createContext();

let headers={
    token:localStorage.getItem("userToken")
}

 function addToWishList(id) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId:id
    }, {
        headers:headers
    }).then((res)=>res).catch((err)=>err);
    
}
function removeItem(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
          headers:headers
      }).then((res)=>res).catch((err)=>err);
      
  }
function getListDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
          headers:headers
      }).then((res)=>res).catch((err)=>err);
      
  }
export default function WishContextProvider(props){
    return <WishContext.Provider value={{addToWishList,getListDetails,removeItem}}>{props.children}</WishContext.Provider>;
 
    }
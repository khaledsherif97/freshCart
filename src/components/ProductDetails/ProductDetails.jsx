import React, { useContext } from 'react'
import styles from './ProductDetails.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { CirclesWithBar } from 'react-loader-spinner'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishContext } from '../../Context/WishContext'

const ProductDetails = () => {
  let id=useParams()
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  let {data,isLoading}= useQuery('productDetails',()=>getProductDetails(id.id))
  console.log(data);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
  let {addToCart,setNumOfCartItems}=useContext(cartContext)
  let {addToWishList}=useContext(WishContext)

  async function addCart(id) {
    let res= await addToCart(id);
    console.log(res.data.status );
    if(res.data.status=="success"){
      toast.success("product added successfully")
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
  />:<div className='container w-75 mt-5'>
  <div className="row">
    <div className="col-md-4">
    <Slider {...settings} className='mb-5'>
      {data?.data?.data.images.map((ele,index)=><img className="w-100 pb-0 mb-0" key={index} src={ele} alt='' />)}
    </Slider>
    </div>
    <div className="col-md-8 py-5 position-relative">
    <h3 className='h5 pt-5'>{data?.data?.data.title.split(' ').slice(0,3).join(" ")}</h3>
    <p>{data?.data?.data.description}</p>
      <div className="d-flex justify-content-between">
        <p>{data?.data?.data.price} EGP</p>
        <p>
          <i className='fa fa-star rating-color'></i>
          {data?.data?.data.ratingsAverage}
        </p>
      </div>
      <i onClick={()=>addWish(data?.data?.data.id)}  className="fs-2 text-dark position-absolute end-0 pe-3 pb-3  fa-solid fa-heart"></i>
      <button onClick={()=>addCart(data?.data?.data.id)} className='btn bg-main text-white mt-5 w-100'>Add to cart</button>
    </div>
    </div>
</div>}
    

    
  </>)
}

export default ProductDetails
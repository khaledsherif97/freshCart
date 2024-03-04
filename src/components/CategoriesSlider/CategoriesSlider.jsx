import React, { useEffect, useState } from 'react'
import styles from '../CategoriesSlider/CategoriesSlider.module.css'
import axios from 'axios';
import Categories from './../Categories/Categories';
import Slider from 'react-slick';
import { useQuery } from 'react-query';

const CategoriesSlider = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    arrows:false,
  };
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   
    
  }

  let {data}= useQuery('CategoriesSlider',getCategories)
  //const [categories,setCategories] =useState([])
  //async function getCategories() {
   //let{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
   // console.log(data);
   // setCategories(data.data)
  //}
 // useEffect(()=>{
    //getCategories();
 // },[])
  return (<>
   <div className="container w-75 py-3">
        <h2>Shop Popular Categories</h2>
        <Slider {...settings}>
          
        {data?.data?.data.map(cat=><div key={cat.id} className='cat'>
         <img className='w-100' height={'150px'} src={cat.image}/>
         <h5>{cat.name}</h5>

        </div>)}
     
        </Slider>
    
   </div>
    </>);
}

export default CategoriesSlider
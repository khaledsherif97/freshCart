import React from 'react'
import styles from './Home.module.css'
import MainSlider from '../MainSlider/MainSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { Helmet } from 'react-helmet'
import Products from '../Products/Products'
import ProductDetails from '../ProductDetails/ProductDetails'

const Home = () => {
  return (
    <>
    <Helmet>      
      <title>Home Page</title>
    </Helmet>
    <MainSlider/>
   <CategoriesSlider/>
    <Products/>
    </>
    
  )
}

export default Home
import React from 'react'
import styles from './Brands.module.css'
import axios from 'axios'
import { CirclesWithBar } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import BrandView from './../BrandView/BrandView';

const Brands = () => {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    
    
  }

  let {data,isLoading}= useQuery('Brands',getBrands)


 
  return (<>
    <div className='container py-5 '>
      <h2 className='text-main  text-center fs-1 fw-bolder py-3'>All Brands</h2>
      
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
  {data.data.data.map((brand)=>  <div key={brand._id} className="col-md-4 col-sm-6 " >
         
          <div className="product py-3 px-3 position-relative">
          <Link to={'/brandView/'+brand._id}>
            <img style={{height:"400px"}} className='w-100' src={brand.image} alt={brand.name}/>
            <p className='text-main h5 text-center fw-bold py-2'>{brand.name}</p>
        
          </Link>
          </div>
        </div>)}
    </div> }
      </div>
  
    </>
    
  )
}

export default Brands
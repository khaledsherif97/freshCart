import React from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import { CirclesWithBar } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

const Categories = () => {


  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   
    
  }

  let {data,isLoading}= useQuery('Categories',getCategories)


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
  {data.data.data.map((cat)=>  <div key={cat.id}  className="col-md-4 col-sm-6 " >
         
          <div className="product py-3 px-3 position-relative">
          <Link to={'/categories/'+cat._id}>
            <img style={{height:"400px"}} className='w-100' src={cat.image} alt={cat.name}/>
            <p className='text-main h3 text-center fw-bold py-2'>{cat.name}</p>

            </Link>
          
          </div>
        
          
        </div>)}
    </div> }
      
      
      
      </div>
  
    
    
    
    
    </>
   
  )
}

export default Categories
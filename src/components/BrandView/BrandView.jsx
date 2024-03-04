import React from 'react'
import axios from 'axios'
import { CirclesWithBar } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Await, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Brands from '../Brands/Brands'

const BrandView = () => {
    let param=useParams()
   

  function getBrandView(id) {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
   
      
    }
    let {data,isLoading}= useQuery('brandView',()=>getBrandView(param.id))
 console.log(data);
  return (<> 
  <div>
  
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
/>:<div key={data?.data.data.id}>

  <div >
     
{ Swal.fire({
      title: data?.data.data.name,
      text: data?.data.data.name,
      imageUrl: data?.data.data.image,
      imageWidth: 400,
      imageHeight: 200,
   
    })}; 
    </div>
</div> } 
  </div>
  
  
  
  
  
  </>
    
  )
}

export default BrandView
import React from 'react'
import axios from 'axios'
import { CirclesWithBar } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'


const SubCategories = () => {
    let params=useParams()
   

    function getSubCategories(id) {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
   
      
    }
    let {data,isLoading}= useQuery('SubCategories',()=>getSubCategories(params.id))
    console.log(data);
  
  return (<>
    <div className='container py-5 '>
      <h2 className='text-main text-center py-4 fw-bold'>Subcategories</h2>
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
     
  {data?.data?.data.map((sub)=>  <div key={sub.id}  className="col-md-4 col-sm-6 " >
         
          <div className="product py-3 px-3 position-relative">
            <p className=' h3 text-center fw-bold py-3 border border-3 rounded-2'>{sub.name}</p>
           </div> 
        </div>)}
    </div> } 
      </div></>)
}

export default SubCategories
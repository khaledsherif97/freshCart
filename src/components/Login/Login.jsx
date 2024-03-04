
import styles from './Login.module.css'
import React, { useContext, useState } from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/Token';
import { Helmet } from 'react-helmet';


const Login = () => {
  let navigate =useNavigate()  
  const[errorMessage,setErrorMessage]=useState('')
  const[isLoding,setIsLoding]=useState(false)
  let {setToken} = useContext(TokenContext)

 async function callLogin(regBody){
    //console.log(regBody);
    setErrorMessage("")
    setIsLoding(true)
    let{data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,regBody)
    .catch(err=>{
    setIsLoding(false)
    setErrorMessage(err.response.data.message)})
    console.log(data);
    if (data.message=="success") {
      localStorage.setItem('userToken',data.token)
       setToken(data.token)
     // console.log(userToken);
      navigate('/Home')
      
    }

  }
  const validationSchema = Yup.object({
   
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"Invalid Password").required("Required"),


  });

   const loginForm = useFormik({
      initialValues:{
     
        email:"",
        password:"",
       
      },
      validationSchema : validationSchema,
      onSubmit:callLogin,
    })

  return (
    <>
     <Helmet>      
      <title>Login Page</title>
    </Helmet>
    <div className="w-50 mx-auto py-3 ">
      <h2 className='mb-3'>Login Now :</h2>
      {errorMessage ? <div className='alert alert-danger py-0'>{errorMessage}</div>:null}
      <form onSubmit={loginForm.handleSubmit}>
      
        <div className="form-group">
          <label htmlFor='email' className='mb-1'>Your E-mail</label>
          <input type='email' value={loginForm.values.email } id='email' name='email'className='form-control' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur}/>
          {loginForm.errors.email &&loginForm.touched.email? <div className='alert alert-danger py-0'>{loginForm.errors.email}</div>:null}
        </div>
        <div className="form-group">
          <label htmlFor='password' className='mb-1'>Password</label>
          <input type='password' value={loginForm.values.password } id='password' name='password'className='form-control' onChange={loginForm.handleChange}  onBlur={loginForm.handleBlur}/>
          {loginForm.errors.password && loginForm.touched.password? <div className='alert alert-danger py-0'>{loginForm.errors.password}</div>:null}
        </div>
       
      
        <button 
        disabled={!(loginForm.isValid&& loginForm.dirty)}
        className='btn bg-main text-white mt-2'>
        {isLoding ? <i className='fa fa-spinner fa-spin'>{isLoding}</i>:"Login"}
           </button>
      </form>

    </div>
    </>
  )
}

export default Login
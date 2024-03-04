import React, { useState } from 'react'
import styles from './Register.module.css'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup';
import { Button } from 'bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

 const Register = () => {
  
  let navigate =useNavigate()  
  const[errorMessage,setErrorMessage]=useState('')
  const[isLoding,setIsLoding]=useState(false)
  
 async function callRegister(regBody){
    //console.log(regBody);
    setErrorMessage("")
    setIsLoding(true)
    let{data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,regBody)
    .catch(err=>{
    setIsLoding(false)
    setErrorMessage(err.response.data.message)})
    console.log(data);
    if (data.message=="success") {
      navigate('/Login')
      
    }

  }
  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Too Short!').max(20, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"Invalid Password").required("Required"),
    rePassword:Yup.string().oneOf([Yup.ref('password')],"password and repassword should be match").required("Required"),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"Invalid phone number").required("Required"),

  });

   const registerForm = useFormik({
      initialValues:{
        name:"",
        email:"",
        password:"",
        rePassword:"",
        phone:"",
      },
      validationSchema : validationSchema,
      onSubmit:callRegister,
    })

  return (
    <>
     <Helmet>      
      <title>Register Page</title>
    </Helmet>
    <div className="w-50 mx-auto py-3 ">
      <h2 className='mb-3'>Register Now :</h2>
      {errorMessage ? <div className='alert alert-danger py-0'>{errorMessage}</div>:null}
      <form onSubmit={registerForm.handleSubmit}>
        <div className="form-group">
          <label htmlFor='fullName' className='mb-1'>Full Name</label>
          <input type='text' value={registerForm.values.name } id='fullName' name='name'className='form-control' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
          {registerForm.errors.name && registerForm.touched.name ? <div className='alert alert-danger py-0'>{registerForm.errors.name}</div>:null}
        </div>
        <div className="form-group">
          <label htmlFor='email' className='mb-1'>Your E-mail</label>
          <input type='email' value={registerForm.values.email } id='email' name='email'className='form-control' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
          {registerForm.errors.email &&registerForm.touched.email? <div className='alert alert-danger py-0'>{registerForm.errors.email}</div>:null}
        </div>
        <div className="form-group">
          <label htmlFor='password' className='mb-1'>Password</label>
          <input type='password' value={registerForm.values.password } id='password' name='password'className='form-control' onChange={registerForm.handleChange}  onBlur={registerForm.handleBlur}/>
          {registerForm.errors.password && registerForm.touched.password? <div className='alert alert-danger py-0'>{registerForm.errors.password}</div>:null}
        </div>
        <div className="form-group">
          <label htmlFor='rePassword' className='mb-1'>RePassword</label>
          <input type='password' value={registerForm.values.rePassword } id='rePassword' name='rePassword'className='form-control' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
          {registerForm.errors.rePassword && registerForm.touched.rePassword ? <div className='alert alert-danger py-0'>{registerForm.errors.rePassword}</div>:null}
        </div>
        <div className="form-group">
          <label htmlFor='phone' className='mb-1'>Your Phone</label>
          <input type='tel' value={registerForm.values.phone } id='phone' name='phone'className='form-control' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
          {registerForm.errors.phone && registerForm.touched.phone? <div className='alert alert-danger py-0'>{registerForm.errors.phone}</div>:null}
        </div>
      
        <button 
        disabled={!(registerForm.isValid&& registerForm.dirty)}
        className='btn bg-main text-white mt-2'>
        {isLoding ? <i className='fa fa-spinner fa-spin'>{isLoding}</i>:"Register"}
           </button>
      </form>

    </div>
    </>
  )
}

export default Register
import React, { useContext } from 'react'
import styles from './CheckOut.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { cartContext } from '../../Context/CartContext'


const CheckOut = () => {

  let {onlinePay}=useContext(cartContext)

 async function payment(values) {
    console.log('hello',values);
    let {data}=await onlinePay(values)
    console.log(data);
    window.location.href=data.session.url
  }
  const validationSchema = Yup.object({
    city: Yup.string().min(3, 'Too Short!').max(20, 'Too Long!').required('Required'),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"Invalid Phone number").required("Required"),

  });
  let formik =useFormik({
    initialValues :{
      "details": "",
      "phone": "",
      "city": ""
      },
      validationSchema : validationSchema,
      onsubmit:payment,
    
  })
 
 
  return (<>
  <div className='container'>
    <div className='mx-auto my-5 bg-main-light p-5'>
      <h2>Shiooing Address</h2>
      <form>
        <div className='form-group mb-3'>
          <label htmlFor='details'>Details :</label>
          <input  type='text' className='form-control' id="details" name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        </div>
        <div className='form-group mb-3'>
          <label htmlFor='phone'>Phone :</label>
          <input type='tel' className='form-control' id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.phone && formik.touched.phone? <div className='alert alert-danger py-0'>{formik.errors.phone}</div>:null}
        </div>
        <div className='form-group mb-3'>
          <label htmlFor='city'>City :</label>
          <input type='text' className='form-control' id="city" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.city && formik.touched.city? <div className='alert alert-danger py-0'>{formik.errors.city}</div>:null}
        </div>
        <div>
        <button onSubmit={payment()} className='btn rounded-pill text-white bg-main w-100 my-3 py-2'>Pay Now :</button>
        </div>
       
      </form>
    </div>

  </div>
  </>)
}

export default CheckOut
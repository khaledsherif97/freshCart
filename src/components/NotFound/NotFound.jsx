import React from 'react'
import styles from './NotFound.module.css'
import error from '../../Assets/images/error.svg'

const NotFound = () => {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center'>
      <img src={error} alt="" className='w-50' />
    </div>
    </>
  )
}

export default NotFound
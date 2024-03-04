import React from 'react'
import styles from './LayOut.module.css'
import NavBar from './../NavBar/NavBar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const LayOut = () => {
  return (
   <>
   <NavBar/>
   <Outlet/>
   <Toaster  toastOptions={{
    className: 'bg-main ',
    style: {
      border: '',
      padding: '16px',
      color: 'black',
      
    },
  }}
 
  />
   <Footer/>
   </>
  )
}

export default LayOut
import React, { useContext } from 'react'
import styles from './NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import Categories from './../Categories/Categories';
import Products from './../Products/Products';
import Brands from './../Brands/Brands';
import Cart from './../Cart/Cart';
import Home from '../Home/Home';
import Login from './../Login/Login';
import Register from './../Register/Register';
import { TokenContext } from '../../Context/Token';
import { cartContext } from '../../Context/CartContext';


const NavBar = () => {
  let{token,setToken}=useContext(TokenContext)
  let{numOfCartItems,setNumOfCartItems}=useContext(cartContext)
  let navigate = useNavigate()



function logOut() {
  localStorage.removeItem('userToken')
  setToken(null);
  navigate("/Login")
 
}
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to={'home'}>
     <img src={logo} />

    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      {token?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={'home'}>Home</Link>
        </li>
        <li className="nav-item position-relative">
          <Link className="nav-link " aria-current="page" to={'cart'}>Cart <i class="fa-solid fa-cart-shopping text-main fs-6 ps-1"> <span className='bg-white text-main rounded-circle  p-1 text-center position-absolute top-0 start-100 border border-3 border-success'>{numOfCartItems}</span></i></Link>
          
        </li>
        <li className="nav-item">
          <Link className="nav-link ms-4" aria-current="page" to={'wishList'}>Wish List </Link>
          
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={'categories'}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={'products'}>Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={'brands'}>Brands</Link>
        </li>
      </ul>:null }
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <a className="nav-link " href="#">
          <i className="fa-brands mx-2 fa-facebook"></i>
          <i className="fa-brands mx-2 fa-tiktok"></i>
          <i className="fa-brands mx-2 fa-instagram"></i>
          <i className="fa-brands mx-2 fa-twitter"></i>
        </a>
      
        </li>
       
        {token?<li className="nav-item">
          <button className="nav-link "  onClick={logOut}>Logout</button>
        </li>:<>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={'register'}>Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={'login'}>Login</Link>
        </li>
        </>}
        
      </ul>
    </div>
  </div>
</nav>

  )
}

export default NavBar
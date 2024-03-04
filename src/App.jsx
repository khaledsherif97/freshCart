import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayOut from './components/LayOut/LayOut';
import Home from './components/Home/Home'
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';

import { useContext, useEffect } from 'react';
import { TokenContext } from './Context/Token';
import ProtectRoutes from './components/ProtectRoutes/ProtectRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails';
import SubCategories from './components/SubCategories/SubCategories';
import BrandView from './components/BrandView/BrandView';
import WishList from './components/WishList/WishList';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';

function App() {

  let{setToken} = useContext(TokenContext)

let routes=createBrowserRouter([
  { path:"/",element:<LayOut />,children:[
    {path:"home",element:<ProtectRoutes><Home /></ProtectRoutes>},
    {path:"products",element:<ProtectRoutes><Products /></ProtectRoutes>},
    {path:"categories",element:<ProtectRoutes><Categories /></ProtectRoutes>},
    {path:"categories/:id",element:<ProtectRoutes><Categories /><SubCategories/></ProtectRoutes>},
    {path:"brands",element:<ProtectRoutes><Brands /></ProtectRoutes>},
    {path:"brandView/:id",element:<ProtectRoutes><Brands/><BrandView/></ProtectRoutes>},
    {path:"cart",element:<ProtectRoutes><Cart /></ProtectRoutes>},
    {path:"productDetails/:id",element:<ProtectRoutes><ProductDetails /></ProtectRoutes>},
    {path:"wishList",element:<ProtectRoutes><WishList /></ProtectRoutes>},
    {path:"CheckOut",element:<ProtectRoutes><CheckOut /></ProtectRoutes>},
    {path:"allorders",element:<ProtectRoutes><AllOrders /></ProtectRoutes>},

    {path:"register",element:<Register />},
    {path:"login",element:<Login />},
    
    

    {path:"*",element:<NotFound />},

  ]}
])

useEffect(()=>{

  if(localStorage.getItem('userToken') !=null){
    setToken(localStorage.getItem('userToken'))
  }
},[])


  return (<>
   <RouterProvider router={routes}></RouterProvider>
   </>
   
  )
}

export default App;

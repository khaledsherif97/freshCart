import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectRoutes = (props) => {
 if (localStorage.getItem("userToken")!=null) {
    return props.children
    
 }else{
    return <Navigate to={'/Login'}/>
 }

}

export default ProtectRoutes
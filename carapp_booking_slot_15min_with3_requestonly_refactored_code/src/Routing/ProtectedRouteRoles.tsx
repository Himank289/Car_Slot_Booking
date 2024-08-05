import React from 'react'
import { getUser } from "../Services/UserService";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRouteRoles:React.FC = () => {
    const location = useLocation();
    const role:string|null = localStorage.getItem("jwtid");

    if (getUser ()&& (role==="ROLE_admin" || role==="admin")) {
       return  <Outlet />
    }
    else{
        return <Navigate to='/login' state={{ from: location.pathname }} />

    }
}

export default ProtectedRouteRoles

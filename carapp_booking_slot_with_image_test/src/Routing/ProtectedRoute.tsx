import React from "react";
import { getUser } from "../Services/UserService";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute:React.FC = () => {
    const location = useLocation();

    return getUser() ? (
        <Outlet />
    ) : (
        <Navigate to='/login' state={{ from: location.pathname }} />
    );
};

export default ProtectedRoute;
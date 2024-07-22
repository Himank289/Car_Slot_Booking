import React from 'react';
import { getUser } from "../Services/userService";
import { Navigate, Outlet, useLocation } from "react-router-dom";
var ProtectedRouteRoles = function () {
    var location = useLocation();
    var role = localStorage.getItem("jwtid");
    if (getUser() && (role === "ROLE_admin" || role === "admin")) {
        return React.createElement(Outlet, null);
    }
    else {
        return React.createElement(Navigate, { to: '/login', state: { from: location.pathname } });
    }
};
export default ProtectedRouteRoles;

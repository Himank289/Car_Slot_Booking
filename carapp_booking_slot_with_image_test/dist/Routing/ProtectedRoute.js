import React from "react";
import { getUser } from "../Services/userService";
import { Navigate, Outlet, useLocation } from "react-router-dom";
var ProtectedRoute = function () {
    var location = useLocation();
    return getUser() ? (React.createElement(Outlet, null)) : (React.createElement(Navigate, { to: '/login', state: { from: location.pathname } }));
};
export default ProtectedRoute;

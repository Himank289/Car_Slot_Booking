import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import CarDetails from '../Pages/CarDetails';
import AddCar from '../Pages/AddCar';
import EditCar from '../Pages/EditCar';
import LoginPage from '../Authentication/LoginPage';
import SignupPage from '../Authentication/SignupPage';
import Logout from '../Authentication/Logout';
import ProtectedRoute from './ProtectedRoute';
import DeleteCar from '../Pages/DeleteCar';
import ProtectedRouteRoles from './ProtectedRouteRoles';
var Routing = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
            React.createElement(Route, { path: "/login", element: React.createElement(LoginPage, null) }),
            React.createElement(Route, { path: "/signup", element: React.createElement(SignupPage, null) }),
            React.createElement(Route, { element: React.createElement(ProtectedRoute, null) },
                React.createElement(Route, { path: "/cars/:id", element: React.createElement(CarDetails, null) }),
                React.createElement(Route, { path: "/logout", element: React.createElement(Logout, null) })),
            React.createElement(Route, { element: React.createElement(ProtectedRouteRoles, null) },
                React.createElement(Route, { path: '/add-car', element: React.createElement(AddCar, null) }),
                React.createElement(Route, { path: '/edit-car/:id', element: React.createElement(EditCar, null) }),
                React.createElement(Route, { path: '/delete-car/:id', element: React.createElement(DeleteCar, null) })))));
};
export default Routing;

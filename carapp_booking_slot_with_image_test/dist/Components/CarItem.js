import React from 'react';
import { Link } from 'react-router-dom';
import "./CarItem.css";
var CarItem = function (_a) {
    var car = _a.car;
    var role = localStorage.getItem("jwtid");
    return (React.createElement("div", { className: 'car-item' },
        React.createElement("h2", null, car.name),
        React.createElement("p", null, car.description),
        React.createElement(Link, { to: "/cars/".concat(car.id) }, "Details"),
        (role === "ROLE_admin" || role === "admin") && React.createElement(Link, { to: "/edit-car/".concat(car.id) }, "Edit"),
        (role === "ROLE_admin" || role === "admin") && React.createElement(Link, { to: "/delete-car/".concat(car.id) }, "Delete")));
};
export default CarItem;

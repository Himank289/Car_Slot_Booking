import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import carService from '../Services/CarService';
import './DeleteCar.css';
var DeleteCar = function () {
    var id = useParams().id;
    var navigate = useNavigate();
    var _a = useState(null), car = _a[0], setCar = _a[1];
    useEffect(function () {
        carService.getCarById(id).then(function (response) {
            setCar(response.data);
        }).catch(function (err) {
            console.error('Error fetching car:', err);
        });
    }, [id]);
    var handleDelete = function () {
        carService.deleteCar(id).then(function () {
            navigate('/');
        });
    };
    if (!car) {
        return React.createElement("div", null, "Loading...");
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: 'delete-car-container' },
            React.createElement("h1", null, "Do You Really Wish to Delete the  Car"),
            React.createElement("button", { className: 'delete-car-button', onClick: handleDelete }, "Delete Car"))));
};
export default DeleteCar;

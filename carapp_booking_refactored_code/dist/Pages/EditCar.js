import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarForm from '../Components/CarForm';
import carService from '../Services/CarService';
import './EditCar.css';
var EditCar = function () {
    var id = useParams().id;
    var navigate = useNavigate();
    var _a = useState(null), car = _a[0], setCar = _a[1];
    useEffect(function () {
        carService.getCarById(id).then(function (response) {
            setCar(response.data);
        });
    }, [id]);
    var handleSave = function (carDetails) {
        carService.updateCar(id, carDetails).then(function () {
            navigate('/');
        });
    };
    if (!car) {
        return React.createElement("div", null, "Loading...");
    }
    return (React.createElement("div", { className: 'edit-car-container' },
        React.createElement("h1", null, "Edit Car"),
        React.createElement(CarForm, { car: car, onSave: handleSave })));
};
export default EditCar;

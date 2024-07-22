import React from 'react';
import { useNavigate } from 'react-router-dom';
import CarForm from '../Components/CarForm';
import carService from '../Services/CarService';
import './AddCar.css';
var AddCar = function () {
    var navigate = useNavigate();
    var handleSave = function (car) {
        carService.createCar(car).then(function () {
            navigate('/');
        });
    };
    return (React.createElement("div", { className: 'add-car-container' },
        React.createElement("h1", null, "Add Car"),
        React.createElement(CarForm, { onSave: handleSave })));
};
export default AddCar;

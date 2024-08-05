import React, { useEffect, useState } from 'react';
import CarItem from './CarItem';
import carService from '../Services/CarService';
import './CarList.css';
var CarList = function () {
    var _a = useState([]), cars = _a[0], setCars = _a[1];
    useEffect(function () {
        carService.getAllCars().then(function (response) {
            setCars(response.data);
        });
    }, []);
    return (React.createElement("div", { className: 'car-list-container' },
        React.createElement("h1", null, "Car List"),
        cars.map(function (car) { return (React.createElement(CarItem, { key: car.id, car: car })); })));
};
export default CarList;

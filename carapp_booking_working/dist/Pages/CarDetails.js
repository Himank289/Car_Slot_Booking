import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import carService from '../Services/CarService';
import './CarDetails.css';
// interface RouteParamsId {
//     id?: string;
//     [key: string]: string | undefined; 
// }
var CarDetails = function () {
    var id = useParams().id;
    var _a = useState(null), car = _a[0], setCar = _a[1];
    useEffect(function () {
        carService.getCarById(id).then(function (response) {
            setCar(response.data);
        });
    }, [id]);
    if (!car) {
        return React.createElement("div", null, "Loading...");
    }
    return (React.createElement("div", { className: 'car-details-container' },
        React.createElement("h1", null, car.name),
        React.createElement("p", null,
            "Brand: ",
            car.brand),
        React.createElement("p", null,
            "Color: ",
            car.color),
        React.createElement("p", null,
            "Type: ",
            car.type),
        React.createElement("p", null,
            "Description: ",
            car.description),
        React.createElement("p", null,
            "Price: ",
            car.price),
        React.createElement("p", null,
            "Year: ",
            car.year),
        React.createElement("img", { src: car.image, alt: car.name })));
};
export default CarDetails;

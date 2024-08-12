import axios from 'axios';
var API_URL = 'http://localhost:8080/cars';
var getAllCars = function () {
    return axios.get("".concat(API_URL, "/"));
};
var getCarById = function (id) {
    return axios.get("".concat(API_URL, "/").concat(id));
};
var createCar = function (car) {
    return axios.post("".concat(API_URL, "/"), car);
};
var updateCar = function (id, car) {
    return axios.put("".concat(API_URL, "/").concat(id), car);
};
var deleteCar = function (id) {
    return axios.delete("".concat(API_URL, "/").concat(id));
};
export default {
    getAllCars: getAllCars,
    getCarById: getCarById,
    createCar: createCar,
    updateCar: updateCar,
    deleteCar: deleteCar
};

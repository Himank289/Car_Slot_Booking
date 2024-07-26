import axios from 'axios';
import Car from '../Types/Car';

const API_URL = 'http://localhost:8080/cars';


const getAllCars = () => {
    return axios.get(`${API_URL}/`);
};

const getCarById = (id:string) => {
    return axios.get(`${API_URL}/${id}`);
};

const createCar = (car:Car) => {
    return axios.post(`${API_URL}/`, car);
};

const updateCar = (id:string, car:Car) => {
    return axios.put(`${API_URL}/${id}`, car);
};

const deleteCar = (id:string) => {
    return axios.delete(`${API_URL}/${id}`);
};

export default {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};
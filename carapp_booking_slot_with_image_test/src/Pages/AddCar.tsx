import React from 'react';
import { useNavigate } from 'react-router-dom';
import CarForm from '../Components/CarForm'
import carService from '../Services/CarService';
import './AddCar.css'
import Car from '../Types/Car';

const AddCar:React.FC = () => {
    const navigate=useNavigate();

    const handleSave = (car:Car) => {
        carService.createCar(car).then(() => {
            navigate('/');
        });
    };

    return (
        <div className='add-car-container'>
            <h1>Add Car</h1>
            <CarForm onSave={handleSave} />
        </div>
    );
};

export default AddCar;

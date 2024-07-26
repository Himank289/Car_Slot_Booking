import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarForm from '../Components/CarForm';
import carService from '../Services/CarService';
import './EditCar.css'
import Car from '../Types/Car';

const EditCar:React.FC = () => {
    const { id } = useParams<{id:string}>();
    const navigate=useNavigate();
    const [car, setCar] = useState<Car|null>(null);

    useEffect(() => {
        carService.getCarById(id!).then(response => {
            setCar(response.data);
        });
    }, [id]);

    const handleSave = (carDetails:Car) => {
        carService.updateCar(id!, carDetails).then(() => {
            navigate('/');
        });
    };

    if (!car) {
        return <div>Loading...</div>;
    }

    return (
        <div className='edit-car-container'>
            <h1>Edit Car</h1>
            <CarForm car={car} onSave={handleSave} />
        </div>
    );
};

export default EditCar;

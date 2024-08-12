import React, { useEffect, useState } from 'react';
import CarItem from './CarItem';
import carService from '../Services/CarService';
import './CarList.css';
import Car from '../Types/Car';

const CarList: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        carService.getAllCars().then(response => {
            setCars(response.data);
        });
    }, []);

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === cars.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? cars.length - 1 : prevIndex - 1));
    };

    return (
        <div className='car-list-container'>
            <h1>Car List</h1>
           
                {cars.length > 0 && <CarItem car={cars[currentIndex]} />}
            <div className='navigation'>
                <div className='arrow' onClick={handlePrevious}>{'<'}</div>
                <div className='arrow' onClick={handleNext}>{'>'}</div>
            </div>
            <div className='progress-bar'data-testid='progress-bar'>
                <div className='progress' style={{ width: `${((currentIndex + 1) / cars.length) * 100}%` }}></div>
            </div>
        </div>
    );
};

export default CarList;

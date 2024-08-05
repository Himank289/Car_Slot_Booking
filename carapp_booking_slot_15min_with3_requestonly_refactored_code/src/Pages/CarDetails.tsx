import React, { useEffect, useState } from 'react';
import carService from '../Services/CarService';
import './CarDetails.css';
import Car from '../Types/Car';

interface CarDetailsProps {
  carId: string;
}

const CarDetails: React.FC <CarDetailsProps>= ({carId }) => {
  const [car, setCar] = useState<Car | null>(null);
  useEffect(() => {
    carService.getCarById(carId!).then(response => {
      setCar(response.data);
    });
  }, [carId]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className='car-details-container'>
      <h1>{car.name}</h1>
      <p>Brand: {car.brand}</p>
      <p>Color: {car.color}</p>
      <p>Type: {car.type}</p>
      <p>Description: {car.description}</p>
      <p>Price: {car.price}</p>
      <p>Year: {car.year}</p>
      <img src={car.image} alt={car.name} />
    </div>
  );
};

export default CarDetails;

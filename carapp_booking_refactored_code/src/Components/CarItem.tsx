import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CarItem.css';
import Car from '../Types/Car';
import CarDetails from '../Pages/CarDetails'; 

interface CarItemProps {
    car: Car;
}

const CarItem: React.FC<CarItemProps> = ({ car }) => {
    const role: string | null = localStorage.getItem('jwtid');
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const toggleDetails = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault(); 
        setShowDetails(!showDetails);
    };

    return (
        <div className='car-item'>
            <div className='car-image'>
                <img src={car.image} alt={car.name} />
            </div>
            <div className='car-details'>
                <h2>{car.name}</h2>
                <p>{car.description}</p>
                <div className='options'>
                    <Link to={`/cars/${car.id}`} className='edit-link' onClick={toggleDetails}>...</Link>

                    {(  (role === 'ROLE_user' || role === 'user') &&<Link to={`/book/${car.id}`} className='edit-link'>Book</Link>)}


                    {(role === 'ROLE_admin' || role === 'admin') && (
                        <>
                            <Link to={`/edit-car/${car.id}`} className='edit-link'>Edit</Link>
                            <Link to={`/delete-car/${car.id}`} className='delete-link'>Delete</Link>
                        </>
                    )}
                </div>
            </div>
            {showDetails && (
                <div className='sidebar'>
                    <CarDetails carId={car.id} /> 
                </div>
            )}
        </div>
    );
};

export default CarItem;

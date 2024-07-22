import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; 
import Car from '~/Types/Car';
import carService from '../Services/CarService';
import './Book.css'; 

const Book = () => {
    const user_id:string|null=localStorage.getItem("id");
    const { id } = useParams<{ id: string }>();
    const Navigate = useNavigate();

    const [car, setCar] = useState<Car | null>(null);
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');

    useEffect(() => {
        carService.getCarById(id!).then(response => {
            setCar(response.data);
        }).catch(error => {
            console.error('Error fetching car details:', error);
        });
    }, [id]);

    const handleBook = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        if (fromDate && toDate && car) {
            try {
              
                const response = await axios.post('http://localhost:8080/cars/car/book', {
                    fromDate,
                    toDate,
                    bookCarStatus: 'PENDING',
                    userId: user_id, 
                    carId: Number(id), 
                });

                if (response.status === 201) {
                    alert(`Booking confirmed for car: ${car.name} from ${fromDate} to ${toDate}`);
                    Navigate('/mybookings');
                } else {
                    alert('Failed to book the car. Please try again.');
                }
            } catch (error) {
                console.error('Error booking car:', error);
                alert('Failed to book the car. Please try again.');
            }
        } else {
            alert('Please fill in all required fields.');
        }
    };

    if (!car) {
        return <div className="book-container">Loading...</div>; 
    }

    return (
        <div className="book-container">
            <h2>{car.name}</h2>
            <p>Brand: {car.brand}</p>
            <p>Color: {car.color}</p>
            <p>Type: {car.type}</p>
            <p>Description: {car.description}</p>
            <img src={car.image} alt={car.name} />

            <form className="book-form" onSubmit={handleBook}>
                <label htmlFor="fromDate">From Date:</label>
                <input type="time-local" id="fromDate" value={fromDate} onChange={e => setFromDate(e.target.value)} required />

                <label htmlFor="toDate">To Date:</label>
                <input type="time-local" id="toDate" value={toDate} onChange={e => setToDate(e.target.value)} required />

                <div>
                    <button type="submit">Book Now</button>
                </div>
            </form>
        </div>
    );
};

export default Book;

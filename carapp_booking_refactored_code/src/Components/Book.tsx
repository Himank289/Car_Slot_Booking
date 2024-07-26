import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; 
import Car from '../Types/Car';
import carService from '../Services/CarService';
import './Book.css'; 

const Book = () => {
    const user_id:string|null=localStorage.getItem("id");
    const { id } = useParams<{ id: string }>();
    const Navigate = useNavigate();

    const [car, setCar] = useState<Car | null>(null);
    const [onDate, setonDate] = useState<string>('');
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        carService.getCarById(id!).then(response => {
            setCar(response.data);
        }).catch(error => {
            console.error('Error fetching car details:', error);
        });
    }, [id]);

    const handleBook = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        if (onDate  && car) {
            try {
              
                const response = await axios.post('http://localhost:8080/cars/car/book', {
                    onDate,
                    time,
                    bookCarStatus: 'PENDING',
                    userId: user_id, 
                    carId: Number(id), 
                });

                if (response.status === 201) {
                    alert(`Booking confirmed for car: ${car.name} on ${onDate} time ${time} `);
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
                <label htmlFor="onDate"> Date:</label>
                <input type="date" id="onDate" value={onDate} onChange={e => setonDate(e.target.value)} required />

                <label htmlFor="time">Time:</label>
                <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required />

                <div>
                    <button type="submit">Book Now</button>
                </div>
            </form>
        </div>
    );
};

export default Book;

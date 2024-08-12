import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; 
import Car from '../Types/Car';
import carService from '../Services/CarService';
import './Book.css'; 


const Book = () => {
    const user_id: string | null = localStorage.getItem("id");
    const { id } = useParams<{ id: string }>();
    const Navigate = useNavigate();

    const [car, setCar] = useState<Car | null>(null);
    const [onDate, setOnDate] = useState<string>('');
    const [timeInterval, setTimeInterval] = useState<{ startTime: string, endTime: string } | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        carService.getCarById(id!).then(response => {
            setCar(response.data);
        }).catch(error => {
            console.error('Error fetching car details:', error);
        });
    }, [id]);

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const generateTimeIntervals = () => {
        const intervals = [];
        const startHour = 9; 
        const endHour = 18; 

        const startTime = new Date(onDate);
        startTime.setHours(startHour, 0, 0, 0);

        const endTime = new Date(onDate);
        endTime.setHours(endHour, 0, 0, 0);

        while (startTime < endTime) {
            const nextStartTime = new Date(startTime);
            nextStartTime.setMinutes(startTime.getMinutes() + 15); 

            intervals.push({
                startTime: formatTime(startTime),
                endTime: formatTime(nextStartTime)
            });

            startTime.setMinutes(startTime.getMinutes() + 15); 
        }

        return intervals;
    };

    const checkSlotAvailability = async (date: string, startTime: string, endTime: string) => {
        try {
            const response = await axios.get('http://localhost:8080/cars/check-slot', {
                params: { date, startTime, endTime }
            });
            return response.data;
        } catch (error) {
            console.error('Error checking slot availability:', error);
            return false;
        }
    };

    const handleBook = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (onDate && timeInterval && car) {
            const isAvailable = await checkSlotAvailability(onDate, timeInterval.startTime, timeInterval.endTime);
            if (isAvailable) {
                try {
                    const response = await axios.post('http://localhost:8080/cars/car/book', {
                        onDate,
                        startTime: timeInterval.startTime,
                        endTime: timeInterval.endTime,
                        bookCarStatus: 'PENDING',
                        userId: user_id,
                        carId: Number(id),
                    });

                    if (response.status === 201) {
                        alert(`Booking for car: ${car.name} on ${onDate} from ${timeInterval.startTime} to ${timeInterval.endTime}`);
                        Navigate('/mybookings');
                    } else {
                        alert('Failed to book the car. Please try again.');
                    }
                } catch (error) {
                    console.error('Error booking car:', error);
                    alert('Failed to book the car. Please try again.');
                }
            } else {
                setError('This time slot is full. Please choose another time slot or date');
              
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
                <label htmlFor="onDate">Date:</label>
                <input 
                    type="date" 
                    id="onDate" 
                    value={onDate} 
                    onChange={e => setOnDate(e.target.value)} 
                    min={new Date().toISOString().split('T')[0]} 
                    required 
                />

                <label htmlFor="timeInterval">Time Interval:</label>
                <select id="timeInterval" onChange={e => setTimeInterval(JSON.parse(e.target.value))} required>
                    <option value="">Select a time interval</option>
                    {generateTimeIntervals().map(({ startTime, endTime }) => {
                        const intervalKey = `${startTime}-${endTime}`;
                        return (
                            <option key={intervalKey} value={JSON.stringify({ startTime, endTime })}>
                                {`${startTime} to ${endTime}`}
                            </option>
                        );
                    })}
                </select>
                {error && <p className="error-message">{error}</p>}

                <div>
                    <button type="submit">Book Now</button>
                </div>
            </form>
        </div>
    );
};

export default Book;
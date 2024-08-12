import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyBooking.css'; 

interface Booking {
    id: number;
    onDate: string; 
    startTime: string;
    endTime: string;
    status: string; 
    carName: string;
}

const MyBooking = () => {
    const id: string | null = localStorage.getItem("id");
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const fetchBookings = async (userId: string) => {
            try {
                const response = await axios.get(`http://localhost:8080/cars/bookings/${userId}`);

                if (response.status === 200) {
                    const formattedBookings = response.data.map((booking: any) => ({
                        id: booking.id,
                        onDate: new Date(booking.onDate).toLocaleDateString(), 
                        startTime: booking.startTime, 
                        endTime: booking.endTime,     
                        status: booking.bookCarStatus,
                        carName: booking.carName
                    }));
                    setBookings(formattedBookings);
                } else {
                    console.error('Failed to fetch bookings');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        if (id) {
            fetchBookings(id);
        }
    }, [id]);

    return (
        <div className="bookings-container">
            <h1>My Bookings</h1>
            {
                bookings.length>0 ?(
            <table className="bookings-table">
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Car Name</th>
                        <th>On Date</th>
                        <th>Time Slot</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.carName}</td>
                            <td>{new Date(booking.onDate).toISOString().slice(0,10)}</td>
                            <td>{`${booking.startTime} to ${booking.endTime}`}</td>
                            <td className="status">{booking.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>)
            :<p>You have not made any bookings yet !!</p>}
        </div>
    );
};

export default MyBooking;

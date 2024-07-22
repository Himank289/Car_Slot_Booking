import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyBooking.css'; 

interface Booking {
    id: number;
    fromDate: string; 
    toDate: string; 
    status: string; 
}


const MyBooking = () => {
    const id:string|null=localStorage.getItem("id");
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const fetchBookings = async (id:string) => {
            try {
                const response = await axios.get(`http://localhost:8080/cars/bookings/${id}`); // Replace '3' with actual userId logic

                if (response.status === 200) {
                    const formattedBookings = response.data.map((booking: any) => ({
                        id: booking.id,
                        fromDate: new Date(booking.fromDate).toLocaleString(), 
                        toDate: new Date(booking.toDate).toLocaleString(), 
                        status: booking.bookCarStatus,
                    }));
                    setBookings(formattedBookings); 
                } else {
                    console.error('Failed to fetch bookings');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings(id!);
    }, []); 

    return (
        <div className="bookings-container">
            <h1>My Bookings</h1>
            <table className="bookings-table">
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.fromDate}</td>
                            <td>{booking.toDate}</td>
                            <td className="status">{booking.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyBooking;

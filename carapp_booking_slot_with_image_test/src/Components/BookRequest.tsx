import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookRequest.css'; 

interface Booking {
    id: number;
    onDate: string;
    startTime: string;
    endTime: string;
    bookCarStatus: string;
    carName:string;
}

const BookRequest = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get<Booking[]>(`http://localhost:8080/cars/bookings`); 
                if (response.status === 200) {
                    setBookings(response.data);
                } else {
                    console.error('Failed to fetch bookings');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    const handleApprove = async (id: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/cars/booking/${id}/Approve`);
            if (response.status === 200) {
                const updatedBookings = bookings.map(booking =>
                    booking.id === id ? { ...booking, bookCarStatus: 'APPROVED' } : booking
                );
                setBookings(updatedBookings);
            } else {
                console.error(`Failed to approve booking ${id}`);
            }
        } catch (error) {
            console.error(`Error approving booking ${id}:`, error);
        }
    };

    const handleReject = async (id: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/cars/booking/${id}/reject`);
            if (response.status === 200) {
                const updatedBookings = bookings.map(booking =>
                    booking.id === id ? { ...booking, bookCarStatus: 'REJECTED' } : booking
                );
                setBookings(updatedBookings);
            } else {
                console.error(`Failed to reject booking ${id}`);
            }
        } catch (error) {
            console.error(`Error rejecting booking ${id}:`, error);
        }
    };

    return (
        <div className="bookings-container">
            <h1>Book Requests</h1>
            <table className="bookings-table">
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>CarName</th>
                        <th>On Date</th>
                        <th>Time Slot</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.carName}</td>
                            <td>{new Date(booking.onDate).toISOString().slice(0, 10)}</td>
                            <td>{`${booking.startTime} to ${booking.endTime}`}</td>
                            <td className="status">{booking.bookCarStatus}</td>
                            <td>
                                <button className="btn" onClick={() => handleApprove(booking.id)}>Approve</button>
                                <button className="btn" onClick={() => handleReject(booking.id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookRequest;

import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Pages/Home';
import UserContext from '../Context/UserContext';
import carImage from '../assets/images/vintage.jpg';

jest.mock('../Components/CarList', () => () => <div>Car List Component</div>);

describe('Home Component', () => {
    test('should display a welcome message and car image when user is not provided', () => {
        render(
            <UserContext.Provider value={null}>
                <Home />
            </UserContext.Provider>
        );
        expect(screen.getByText('Welcome to the Car Slot Booking App')).toBeInTheDocument();
        expect(screen.getByAltText('Car')).toHaveAttribute('src', carImage);
        expect(screen.getByAltText('Car')).toHaveClass('car-image');
        expect(screen.queryByText('Car List Component')).toBeNull(); 
    });

    test('should display CarList component when user is provided', () => {
        render(
            <UserContext.Provider value={{ id: "1", name: 'John Doe',email:"John Doe",password:"JohnDoe@1234",role:"user" }}>
                <Home />
            </UserContext.Provider>
        );

        expect(screen.getByText('Welcome to the Car Slot Booking App')).toBeInTheDocument();
        expect(screen.queryByAltText('Car')).toBeNull();
        expect(screen.getByText('Car List Component')).toBeInTheDocument();
    });
});

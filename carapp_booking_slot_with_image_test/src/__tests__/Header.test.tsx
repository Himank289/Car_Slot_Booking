import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Components/Header';
import UserContext from '../Context/UserContext';


const renderHeaderWithContext = (user: any, role: string | null) => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
        if (key === 'jwtid') return role;
        return null;
    });

    render(
        <UserContext.Provider value={user}>
            <Router>
                <Header />
            </Router>
        </UserContext.Provider>
    );
};

describe('Header Component', () => {

    test('renders correct links for authenticated admin user', () => {
        const user = { name: 'Admin User' };
        const role = 'ROLE_admin';

        renderHeaderWithContext(user, role);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Add Car')).toBeInTheDocument();
        expect(screen.getByText('Bookings')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.queryByText('Signup')).not.toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.queryByText('MyBookings')).not.toBeInTheDocument();
    });

    test('renders correct links for authenticated user', () => {
        const user = { name: 'Regular User' };
        const role = 'ROLE_user';

        renderHeaderWithContext(user, role);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.queryByText('Add Car')).not.toBeInTheDocument();
        expect(screen.queryByText('Bookings')).not.toBeInTheDocument();
        expect(screen.getByText('MyBookings')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.queryByText('Signup')).not.toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    test('renders correct links for non-authenticated users', () => {
        const user = null;
        const role = null;

        renderHeaderWithContext(user, role);

        expect(screen.queryByText('Home')).not.toBeInTheDocument();
        expect(screen.queryByText('Add Car')).not.toBeInTheDocument();
        expect(screen.queryByText('Bookings')).not.toBeInTheDocument();
        expect(screen.queryByText('MyBookings')).not.toBeInTheDocument();
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
        expect(screen.getByText('Signup')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });
});

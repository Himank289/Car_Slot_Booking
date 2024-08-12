import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CarItem from '../Components/CarItem';
import Car from '../Types/Car';
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('../Pages/CarDetails', () => () => <div>Car Details Component</div>);

const mockCar: Car =  { id: '1', brand:'Volkswagen',color:'red',name: 'Polo',type:'hatchback',description:'A 5 Seater Hatchback',price:'75600',year:'2023',image:'xskmx'}

const renderCarItemWithRole = (role: string | null) => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
        if (key === 'jwtid') return role;
        return null;
    });

    render(
        <Router>
            <CarItem car={mockCar} />
        </Router>
    );
};

describe('CarItem Component', () => {

    test('displays correct links for ROLE_user', () => {
        renderCarItemWithRole('ROLE_user');

        expect(screen.getByText('Book')).toBeInTheDocument();
        expect(screen.queryByText('Edit')).not.toBeInTheDocument();
        expect(screen.queryByText('Delete')).not.toBeInTheDocument();
    });

    test('displays correct links for ROLE_admin', () => {
        renderCarItemWithRole('ROLE_admin');

        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
        expect(screen.queryByText('Book')).not.toBeInTheDocument();
    });

    test('displays correct links for unauthenticated user', () => {
        renderCarItemWithRole(null);

        expect(screen.queryByText('Edit')).not.toBeInTheDocument();
        expect(screen.queryByText('Delete')).not.toBeInTheDocument();
        expect(screen.queryByText('Book')).not.toBeInTheDocument();
    });

    test('toggles car details on click', () => {
        renderCarItemWithRole(null); 
        expect(screen.queryByText('Car Details Component')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('...'));
        expect(screen.getByText('Car Details Component')).toBeInTheDocument();
        fireEvent.click(screen.getByText('...'));
        expect(screen.queryByText('Car Details Component')).not.toBeInTheDocument();
    });
});

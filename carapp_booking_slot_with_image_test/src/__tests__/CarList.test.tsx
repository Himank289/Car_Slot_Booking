import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CarList from '../Components/CarList';
import carService from '../Services/CarService';
import Car from '../Types/Car';


jest.mock('../Services/CarService', () => ({
    getAllCars: jest.fn(),
}));

jest.mock('../Components/CarItem', () => () => <div data-testid="car-item">Car Item Component</div>);

describe('CarList Component', () => {
    const mockCars: Car[] = [
        { id: '1', brand:'Volkswagen',color:'red',name: 'Polo',type:'hatchback',description:'A 5 Seater Hatchback',price:'75600',year:'2023',image:'xskmx'}
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders CarList component and fetches cars ', async () => {
        (carService.getAllCars as jest.Mock).mockResolvedValueOnce({ data: mockCars });

        render(<CarList />);
        await waitFor(() => {
            expect(screen.getByTestId('car-item')).toBeInTheDocument();
        });
    });

    test('handles next and previous navigation', async () => {
        (carService.getAllCars as jest.Mock).mockResolvedValueOnce({ data: mockCars });

        render(<CarList />);
        await waitFor(() => {
            expect(screen.getByText('Car Item Component')).toBeInTheDocument();
        });

        const nextButton = screen.getAllByText('>')[0];
        fireEvent.click(nextButton);
        const prevButton = screen.getAllByText('<')[0];
        fireEvent.click(prevButton);

    });

    test('displays the correct progress bar width', async () => {
        (carService.getAllCars as jest.Mock).mockResolvedValueOnce({ data: mockCars });

        render(<CarList />);

        await waitFor(() => {
            const progressBar = screen.getByTestId('progress-bar');
            const progress = progressBar.querySelector('.progress');
            expect(progress).toHaveStyle('width: 100%');
        });
    });
});

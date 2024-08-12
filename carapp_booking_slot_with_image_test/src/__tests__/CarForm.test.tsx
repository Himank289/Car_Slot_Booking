import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CarForm from '../Components/CarForm';
import Car from '../Types/Car';

describe('CarForm Component', () => {
    const mockOnSave = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders form with empty fields', () => {
        render(<CarForm onSave={mockOnSave} />);
        
        expect(screen.getByPlaceholderText('id')).toHaveValue(null);
        expect(screen.getByPlaceholderText('Brand')).toHaveValue('');
        expect(screen.getByPlaceholderText('Color')).toHaveValue('');
        expect(screen.getByPlaceholderText('Name')).toHaveValue('');
        expect(screen.getByPlaceholderText('Type')).toHaveValue('');
        expect(screen.getByPlaceholderText('Description')).toHaveValue('');
        expect(screen.getByPlaceholderText('Image URL')).toHaveValue('');
    });

    test('calls onSave with correct data on form submit', () => {
        render(<CarForm onSave={mockOnSave} />);
    
        fireEvent.change(screen.getByPlaceholderText('id'), { target: { value: '1' } });
        fireEvent.change(screen.getByPlaceholderText('Brand'), { target: { value: 'Toyota' } });
        fireEvent.change(screen.getByPlaceholderText('Color'), { target: { value: 'Red' } });
        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Corolla' } });
        fireEvent.change(screen.getByPlaceholderText('Type'), { target: { value: 'Sedan' } });
        fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'A reliable car' } });
        fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '20000' } });
        fireEvent.change(screen.getByPlaceholderText('Year'), { target: { value: '2020' } });
        fireEvent.change(screen.getByPlaceholderText('Image URL'), { target: { value: 'http://example.com/car.jpg' } });
        fireEvent.click(screen.getByText('Save'));

        expect(mockOnSave).toHaveBeenCalledWith({
            id: '1',
            brand: 'Toyota',
            color: 'Red',
            name: 'Corolla',
            type: 'Sedan',
            description: 'A reliable car',
            price: '20000',
            year: '2020',
            image: 'http://example.com/car.jpg',
        });
    });

    test('prefills form with car data', () => {
        const car: Car = {
            id: '2',
            brand: 'Honda',
            color: 'Blue',
            name: 'Civic',
            type: 'Sedan',
            description: 'A compact car',
            price: '18000',
            year: '2019',
            image: 'http://example.com/civic.jpg'
        };

        render(<CarForm car={car} onSave={mockOnSave} />);
        
        expect(screen.getByPlaceholderText('id')).toHaveValue(2);
        expect(screen.getByPlaceholderText('Brand')).toHaveValue('Honda');
        expect(screen.getByPlaceholderText('Color')).toHaveValue('Blue');
        expect(screen.getByPlaceholderText('Name')).toHaveValue('Civic');
        expect(screen.getByPlaceholderText('Type')).toHaveValue('Sedan');
        expect(screen.getByPlaceholderText('Description')).toHaveValue('A compact car');
        expect(screen.getByPlaceholderText('Price')).toHaveValue(18000);
        expect(screen.getByPlaceholderText('Year')).toHaveValue(2019);
        expect(screen.getByPlaceholderText('Image URL')).toHaveValue('http://example.com/civic.jpg');
    });
});

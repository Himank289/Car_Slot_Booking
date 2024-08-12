import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './CarForm.css'

import Car from '../Types/Car';

interface CarFormProps {
    car?: Car | null; 
    onSave: (formData: Car) => void;
}

const CarForm:React.FC <CarFormProps>= ({ car, onSave }) => {
    const [formData, setFormData] = useState<Car>({
        id:'',
        brand: '',
        color: '',
        name: '',
        type: '',
        description: '',
        price: '',
        year: '',
        image: ''
    });

    useEffect(() => {
        if (car) {
            setFormData(car);
        }
    }, [car]);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(formData)
    };

    return (
        <form className='car-form' onSubmit={handleSubmit}>
            
            <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="id"
                required
            />
            <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand"
                required
            />
            <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Color"
                required
            />
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required

            />
            <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Type"
                required

            />
            <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
            />
            <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Year"
                required
            />
            <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                required
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default CarForm;
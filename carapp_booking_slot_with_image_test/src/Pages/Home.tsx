import React ,{useContext}from 'react';
import CarList from '../Components/CarList';
import './Home.css'
import UserContext from "../Context/UserContext";
import carImage from '../assets/images/vintage.jpg';


const Home:React.FC= () => {

    const user = useContext(UserContext);

    return (
        <div className='home-container'>
            <h1>Welcome to the Car Slot Booking App</h1>
            {!user && 
            <img src={carImage} alt="Car" className='car-image' />}
           {user && <CarList />}
        </div>
    );
};

export default Home;
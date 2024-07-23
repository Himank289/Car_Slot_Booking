import React ,{useContext}from 'react';
import CarList from '../Components/CarList';
import './Home.css'
import UserContext from "../Context/UserContext";



const Home :React.FC= () => {

    const user = useContext(UserContext);

    return (
        <div className='home-container'>
            <h1>Welcome to the Car Management App</h1>
           {user && <CarList />}
        </div>
    );
};

export default Home;
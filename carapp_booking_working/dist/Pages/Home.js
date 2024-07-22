import React, { useContext } from 'react';
import CarList from '../Components/CarList';
import './Home.css';
import UserContext from "../Context/UserContext";
var Home = function () {
    var user = useContext(UserContext);
    return (React.createElement("div", { className: 'home-container' },
        React.createElement("h1", null, "Welcome to the Car Management App"),
        user && React.createElement(CarList, null)));
};
export default Home;

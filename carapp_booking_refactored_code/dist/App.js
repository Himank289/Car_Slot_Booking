// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserContext from './Context/UserContext';
import Header from './Components/Header';
import './App.css';
import setAuthToken from './Utils/setAuthToken';
import { getJwt, getUser } from './Services/userService';
import Routing from './Routing/Routing';
setAuthToken(getJwt());
var App = function () {
    var _a = useState(), user = _a[0], setUser = _a[1];
    useEffect(function () {
        try {
            var jwtUser = getUser();
            if (jwtUser && Date.now() >= jwtUser.exp * 1000) {
                localStorage.removeItem('jwt');
                // location.reload();
            }
            else {
                setUser(jwtUser);
                // console.log(jwtUser);
            }
        }
        catch (error) {
            console.error('Error fetching user:', error);
        }
    }, []);
    return (React.createElement(UserContext.Provider, { value: user },
        React.createElement(Router, null,
            React.createElement("div", { className: "App" },
                React.createElement(Header, null),
                React.createElement(Routing, null)))));
};
export default App;

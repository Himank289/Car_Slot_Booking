import React, { useEffect, useState } from 'react';
import {  BrowserRouter as Router } from 'react-router-dom';
import UserContext from './Context/UserContext';

import Header from './Components/Header';
import './App.css';

import setAuthToken from './Utils/setAuthToken';
import { getJwt, getUser } from './Services/UserService';
import Routing from './Routing/Routing';

setAuthToken(getJwt());

const App:React.FC = () => {
    const [user, setUser] = useState<any>();
    
    useEffect(() => {
        try {
            const jwtUser = getUser();
            if (jwtUser && Date.now() >= jwtUser.exp! * 1000) {
                localStorage.removeItem('jwt');
            } else {
                setUser(jwtUser);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }, []);



    return (
        <UserContext.Provider value={user}>
            <Router>
                <div className="App">
                    <Header />
             <Routing/>
                </div>
            </Router>
        </UserContext.Provider>
    );
};

export default App;

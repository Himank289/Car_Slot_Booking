import React ,{useContext}from 'react';
import { Link } from 'react-router-dom';
import UserContext from "../Context/UserContext";
import './Header.css';

const Header:React.FC = () => {

    const user = useContext(UserContext);

    const role:string|null = localStorage.getItem("jwtid");
    return (
        <header className="header">
          
            <nav>
                <ul>

                 { user &&(
                     <> 
                 <li><Link to="/">Home</Link></li>
               {(role==="ROLE_admin" || role==="admin" )&&
               <>
               
               <li><Link to="/add-car">Add Car</Link></li>
                 <li><Link to="/bookings">Bookings</Link></li>
                </>
               
               }
                    {(role==="ROLE_user" || role==="user")&&
                     <li><Link to="/mybookings">MyBookings</Link></li>
                    }
                    <li><Link to="/logout">Logout</Link></li>
                    </>
                )}

                

                {!user &&(  
                    <> 
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    </>
                )} 
                </ul>
            </nav>
        </header>
    );
};

export default Header;

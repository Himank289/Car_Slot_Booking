import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from "../Context/UserContext";
import './Header.css';
var Header = function () {
    var user = useContext(UserContext);
    var role = localStorage.getItem("jwtid");
    return (React.createElement("header", { className: "header" },
        React.createElement("nav", null,
            React.createElement("ul", null,
                user && (React.createElement(React.Fragment, null,
                    React.createElement("li", null,
                        React.createElement(Link, { to: "/" }, "Home")),
                    (role === "ROLE_admin" || role === "admin") && React.createElement("li", null,
                        React.createElement(Link, { to: "/add-car" }, "Add Car")),
                    React.createElement("li", null,
                        React.createElement(Link, { to: "/logout" }, "Logout")))),
                !user && (React.createElement(React.Fragment, null,
                    React.createElement("li", null,
                        React.createElement(Link, { to: "/signup" }, "Signup")),
                    React.createElement("li", null,
                        React.createElement(Link, { to: "/login" }, "Login"))))))));
};
export default Header;

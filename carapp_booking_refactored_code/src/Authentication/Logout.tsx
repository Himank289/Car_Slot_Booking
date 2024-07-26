import React, { useEffect } from "react";
import { logout } from "../Services/userService"

const Logout:React.FC = () => {
    useEffect(() => {
        logout();
        window.location.href = "/";
    }, []);

    return null;
};

export default Logout;
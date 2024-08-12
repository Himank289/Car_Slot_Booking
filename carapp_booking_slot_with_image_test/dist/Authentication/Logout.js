import { useEffect } from "react";
import { logout } from "../Services/userService";
var Logout = function () {
    useEffect(function () {
        logout();
        window.location.href = "/";
    }, []);
    return null;
};
export default Logout;

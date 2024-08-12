import axios from "axios";

const setAuthToken = (token:string|null) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    } else {
        delete axios.defaults.headers.common["Authorization"];
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    }
};

export default setAuthToken;
import axios from "axios";
var setAuthToken = function (token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer ".concat(token);
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    }
    else {
        delete axios.defaults.headers.common["Authorization"];
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    }
};
export default setAuthToken;

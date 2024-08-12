import axios from "axios";
import {jwtDecode} from "jwt-decode";

const API_URL = 'http://localhost:8080';

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface LoginData {
  jwt: string;
  user: {
      role: string;
      id:string;
  };
}


export async function signup(user:User) {
    const body = new FormData();
    body.append("name", user.name);
    body.append("email", user.email);
    body.append("password", user.password);
    body.append("role", user.role);

 
    
    const { data }:{data:LoginData} = await axios.post(`${API_URL}/auth/signup`, body);
    
    localStorage.setItem("jwt", data.jwt);
    localStorage.setItem("jwtid",data.user.role);
    
    localStorage.setItem("id",data.user.id);

}



export async function login(user:{email:string,password:string}) {
  try {
    const { data }:{data:LoginData} = await axios.post(`${API_URL}/auth/signin`, user);

    localStorage.setItem("jwt", data.jwt);

    localStorage.setItem("jwtid",data.user.role);

    localStorage.setItem("id",data.user.id);


  } catch (error) {
    console.error('Error occurred during login:', error);
    throw error; 
  }
}


export function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("jwtid");
    localStorage.removeItem("id");
    
}

export function getUser() {
    try {
        const jwt = localStorage.getItem("jwt");
        if(jwt===null){
          return null;
        }
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem("jwt");
}
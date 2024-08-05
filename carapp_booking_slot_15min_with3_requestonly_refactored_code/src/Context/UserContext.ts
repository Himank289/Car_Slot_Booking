import { createContext } from "react";


interface User {
    id?: string;
    name: string;
    email:string;
    password:string;
    role: string;
  
}
const UserContext = createContext<User|null>(null);



export default UserContext;
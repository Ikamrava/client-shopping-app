import axios from "axios";
import { createContext, useEffect, useState } from "react";




export const AuthCotext = createContext()

export const AuthContectProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async (username,password) =>{
         axios.defaults.withCredentials = true;
         const res = await axios.post('http://localhost:8020/login',{username:username,password:password})

        setCurrentUser(res.data)
    }

    const logout = async (input) =>{
        axios.defaults.withCredentials = true;
       await axios.post('http://localhost:8020/logout')
       setCurrentUser(null)
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser])

    return (
        <AuthCotext.Provider value = {{currentUser,login,logout}}>{children}</AuthCotext.Provider>
    )
}


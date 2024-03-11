'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import userService from "@/services/user.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const getCurrentUser = async()=>{
          const currentUser = await userService.getCurrentUser();
          console.log(90,currentUser)
          if(currentUser){
            setIsAuth(true);
            setUser(currentUser.data.user);
          }
          else{
            setIsAuth(false);
            setUser(null);
          }
        }
        getCurrentUser();
    },[])

  return (
    <AuthContext.Provider
     value={{ 
        isAuth,
        setIsAuth, 
        user,
        setUser,
       }}
     >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

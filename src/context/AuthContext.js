'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null)

    // useEffect(()=>{
    //     const getCurrentUser = async()=>{
    //       const currentUser = await userService.getCurrentUser();
    //       if(currentUser){
    //         setIsAuth(true);
    //         setUser(currentUser);
    //       }
    //       else{
    //         setIsAuth(false);
    //         setUser(null);
    //       }
    //     }
    //     getCurrentUser();
    // },[])

  return (
    <AuthContext.Provider
     value={{ 
        isAuth,
        setIsAuth, 
        user,
        setuser,
       }}
     >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

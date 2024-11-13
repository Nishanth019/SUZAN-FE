'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import userService from "@/services/user.service";
import collegeService from '@/services/college.service';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null)
    const [college,setCollege]=useState(null)

    useEffect(()=>{
        const getCurrentUser = async()=>{
          const currentUser = await userService.getCurrentUser();
          // console.log(90,currentUser)
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
        // getCurrentUserCollege();
    },[])
    useEffect(() => {
        const getCurrentUserCollege = async () => {
          // console.log(89, user);
    
          const currentCollege = await collegeService.getCollegeById(user.college);
          // console.log(90, currentCollege);
          if (currentCollege) {
    
            setCollege(currentCollege.data.college);
          } else {
    
            setCollege(null);
          }
    
        }
        getCurrentUserCollege();
      }, [user])
  return (
    <AuthContext.Provider
     value={{ 
        isAuth,
        setIsAuth, 
        user,
        setUser,
        college,
        setCollege
       }}
     >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

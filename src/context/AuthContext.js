'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import userService from "@/services/user.service";
import collegeService from '@/services/college.service';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(() => {
        // Initialize from localStorage
        return localStorage.getItem('isAuth') === 'true';
    });
    const [user, setUser] = useState(null);
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const currentUser = await userService.getCurrentUser();
                if (currentUser) {
                    setIsAuth(true);
                    setUser(currentUser.data.user);
                    localStorage.setItem('isAuth', 'true');
                } else {
                    setIsAuth(false);
                    setUser(null);
                    localStorage.removeItem('isAuth');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setIsAuth(false);
                localStorage.removeItem('isAuth');
            } finally {
                setLoading(false); // Mark loading as false once the call finishes
            }
        };

        getCurrentUser();
    }, []);

    useEffect(() => {
        const getCurrentUserCollege = async () => {
            if (!user) return;
            try {
                const currentCollege = await collegeService.getCollegeById(user.college);
                setCollege(currentCollege?.data?.college || null);
            } catch (error) {
                console.error('Error fetching college:', error);
                setCollege(null);
            }
        };

        getCurrentUserCollege();
    }, [user]);

    useEffect(() => {
        if (!loading && !isAuth) {
            router.replace('/signin'); // Redirect only after checking `isAuth`
        }
    }, [isAuth, loading, router]);

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setIsAuth,
                user,
                setUser,
                college,
                setCollege,
            }}
        >
            {!loading && children} {/* Render children only after loading is false */}
        </AuthContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AuthContext);
};

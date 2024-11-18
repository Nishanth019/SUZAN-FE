'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import userService from "@/services/user.service";
import collegeService from '@/services/college.service';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false); // Track if we're on the client-side

    useEffect(() => {
        setIsClient(true); // Set to true once the component mounts in the client
    }, []);

    useEffect(() => {
        if (!isClient) return; // Only run this effect on the client-side

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
                setLoading(false);
            }
        };

        getCurrentUser();
    }, [isClient]); // Dependency on `isClient` ensures this only runs on the client

    useEffect(() => {
        if (!user) return;

        const getCurrentUserCollege = async () => {
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
            router.replace('/signin');
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
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AuthContext);
};

'use client'
import React, { useState, useRef, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosNotificationsOutline } from "react-icons/io";
import logo from "../../../assets/Navbar/logo.png";
import { MdOutlineMenu } from "react-icons/md";
import { useGlobalContext } from "@/context/AuthContext";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "radix-ui";
import authService from "@/services/auth.service";
import { useRouter } from "next/navigation";

const Header = (props) => {
  
  const [openProfile, setOpenProfile] = useState(false);

  const { isAuth, user ,setIsAuth,setUser} = useGlobalContext();

  // console.log(22,user,isAuth);

  const profileRef = useRef(null);
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await authService.signout(); 
      setIsAuth(false); 
      setUser(null); 
      // Clear localStorage
      localStorage.removeItem("isAuth");
      router.push("/signin");
    } catch (error) {
      console.error("Error occurred while signing out:", error);
      // Handle sign-out error, if any
    }
  }

  const handleProfileDropdown = (e) => {
    e.stopPropagation(); // Preventing event propagation
    setOpenProfile(!openProfile);
    setOpenMenu(false);
  };

  const handleClickOutside = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setOpenProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <header className="sticky top-0 z-[999] flex w-full bg-white shadow-xl ">
      <div className="flex flex-grow items-center justify-between lg:justify-end px-4 lg:py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-[99999] block rounded-sm border border-stroke bg-white p-1 shadow-sm lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
            <MdOutlineMenu className="w-7 h-7"/>
            </span>
          </button>

          <Link href="/">
            <div className="block flex-shrink-0 lg:hidden">
              <Image
              className="w-[100px] h-auto max-lg:mt-[-10px] max-lg:mb-[-10px]"
                src={logo}
                alt="Logo"
              />
            </div>
          </Link>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0 ">
              <button
                type="button"
                className="rounded-full text-black p-2 bg-slate-200  hover:bg-black/5"
              >
                <IoIosNotificationsOutline className="h-5 w-5 lg:h-7 lg:w-7" />
              </button>
              <div className="ml-3 lg:ml-6 relative" ref={profileRef}>
                <div
                  onClick={handleProfileDropdown}
                  className="w-full h-full  flex space-x-3 cursor-pointer"
                >
                  <div className="rounded-full overflow-hidden">
                    {user?.picture ? (
                      <img
                        className="h-9 w-9 lg:h-10 lg:w-10 object-cover object-center "
                        src={user?.picture}
                        alt={user?.name}
                      />
                    ) : (
                      <div className="inline-flex items-center justify-center  w-[38px] h-[38px] lg:w-[45px] lg:h-[45px]  bg-gray-400 rounded-full">
                        <span className="font-medium text-white text-xl ">
                          {" "}
                          {user?.name ? user?.name[0] : `E`}
                        </span>
                      </div>
                    )}
                  </div>
                  <button className="max-md:hidden text-[#6F6C99]  border-none  flex items-center space-x-1">
                    <span className="font-medium text-md lg:text-lg">
                      {user?.name}
                    </span>
                    <IoIosArrowDown className="text-black" />
                  </button>
                </div>

                {openProfile && (
                  <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-[50]">
                    <p className="block md:hidden px-4 py-2 text-md text-white bg-[#36518F] text-semibold ">
                      {user?.name}
                    </p>
                    <Link
                      href='/profile'
                      className="block px-4 py-2 text-md text-gray-700 hover:text-black hover:text-semibold hover:bg-black/5"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-md text-gray-700 hover:text-black hover:text-semibold hover:bg-black/5"
                    >
                      Settings
                    </Link>
                    <p
                    onClick={handleSignOut}
                      className="block px-4 py-2 text-md text-gray-700 hover:text-white hover:text-semibold hover:cursor-pointer hover:bg-red-500  transition-all duration-75"
                    >
                      Sign out
                    </p>
                  </div>
                )}
              </div>
            </div>
      </div>
    </header>
  );
};

export default Header;

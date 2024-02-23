'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from "../../assets/Navbar/logo.png"
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";


const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'Clubs', href: '/clubs' },
    { name: 'Events', href: '/events' },
    { name: 'Places Nearby', href: '/nearby-places' },
];

const Navbar = () => {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [user, setUser] = useState({
        name: "Nishanth",
        picture:"https://images.herzindagi.info/image/2020/Feb/sunny-leone-shares-beauty-secrets-m.jpg",
        role: "student",
    });
    // const [user, setUser] = useState(null);

    const handleMenuToggle = () => {
        setOpenMenu(!openMenu);
        setOpenProfile(false);
    };
    const handleProfileDropdown = () => {
        setOpenProfile(!openProfile);
        setOpenMenu(false);
    };

    return (
        <nav className="bg-white overflow:hidden drop-shadow ">
            <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
                <div className="relative flex h-20 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex space-x-4 items-center md:hidden">
                        {/* Mobile menu button*/}
                        <button
                            onClick={handleMenuToggle}
                            className=" inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="absolute -inset-0.5" />
                            {openMenu ? (
                                <AiOutlineClose size={25} />
                            ) : (
                                <MdOutlineMenu size={25} />
                            )}
                        </button>
                        <Image
                            className="w-[120px] h-auto "
                            src={logo}
                            alt="SUZAN"
                        />
                    </div>
                    <div className="max-md:hidden flex flex-1 items-center justify-center md:items-center md:justify-start">
                        <div className="flex items-center">
                            <Image
                                className="w-[120px] h-auto "
                                src={logo}
                                alt="SUZAN"
                            />
                        </div>
                        <div className="ml-2 lg:ml-6 ">
                            <div className="flex space-x-1 lg:space-x-4">
                                {navigation.map((item) => (
                                    <Link onClick={() => handleLinkClick(item.href)} key={item.name} href={item.href}
                                        className={`${pathname === item.href
                                                ? 'text-[#00A5E0]'
                                                : 'text-[#4F4F4F] hover:text-black'
                                            } whitespace-nowrap  rounded-md px-3 py-2 text-[14px] lg:text-[16px]  font-medium`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    {user ? (
                        <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0 ">
                            <button
                                type="button"
                                className="relative rounded-full text-black p-2 bg-slate-200  hover:bg-black/5"
                            >
                                <IoIosNotificationsOutline className="h-5 w-5 lg:h-7 lg:w-7" />
                            </button>
                            {/* Profile dropdown */}
                            <div className="relative ml-3 lg:ml-6">
                                <div onClick={handleProfileDropdown}  className="w-full h-full  flex space-x-3 cursor-pointer">
                                    <div className="rounded-full overflow-hidden">
                                    {user?.picture ? (
                                        <img
                                            className="h-9 w-9 lg:h-10 lg:w-10 object-cover object-center "
                                            src={user?.picture}
                                            alt={user?.name}
                                        />
                                    ) : (
                                        <div class="relative inline-flex items-center justify-center  w-[38px] h-[38px] lg:w-[45px] lg:h-[45px]  bg-gray-400 rounded-full">
                                            <span class="font-medium text-white text-xl "> {user?.name ? user?.name[0] : `E`}</span>
                                        </div>
                                    )}
                                    </div>
                                    <button
                                        className="max-md:hidden text-[#6F6C99]  border-none  flex items-center space-x-1"
                                    >
                                        <span className="font-medium text-md lg:text-lg">{user?.name}</span>
                                        <IoIosArrowDown className="text-black" />
                                    </button>

                                </div>

                                {openProfile && (
                                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                                        <p href="#" className="block md:hidden px-4 py-2 text-md text-white bg-[#36518F] text-semibold ">{user?.name}
                                        </p>
                                        <Link href="#" className="block px-4 py-2 text-md text-gray-700 hover:text-black hover:text-semibold hover:bg-black/5">Your Profile
                                        </Link>
                                        <Link href="#" className="block px-4 py-2 text-md text-gray-700 hover:text-black hover:text-semibold hover:bg-black/5">Settings
                                        </Link>
                                        <Link href="#" className="block px-4 py-2 text-md text-gray-700 hover:text-white hover:text-semibold hover:bg-red-500  transition-all duration-75">Sign out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0 ">
                            <div className="flex gap-4">
                                <button
                                    className="md:text-[14px] text-xs rounded-full px-4 md:px-6 capitalize py-1 md:py-2 bg-transparent border-2 border-[#36518F] text-[#36518F] font-medium hover:bg-[#36518F] hover:text-white transition-all duration-75"
                                >
                                    login
                                </button>
                                <button
                                    className="hidden lg:block md:text-[14px] text-xs rounded-full px-6 capitalize py-2 bg-[#FF8B4A] hover:bg-[#FF8000] border-2  text-white font-medium transition-all duration-75"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            {openMenu && (
                <div className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} onClick={handleMenuToggle}
                                className={'text-gray-700 hover:text-black hover:text-semibold hover:bg-black/5 block rounded-md px-3 py-2 text-base font-medium'}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
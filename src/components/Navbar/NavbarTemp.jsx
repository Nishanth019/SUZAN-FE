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

const NavbarTemp = () => {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    // const [user, setUser] = useState({
    //     name: "Nishanth",
    //     picture: "https://images.herzindagi.info/image/2020/Feb/sunny-leone-shares-beauty-secrets-m.jpg",
    //     role: "student",
    // });
    
    const [user, setUser] = useState(null);

    const handleMenuToggle = () => {
        setOpenMenu(!openMenu);
        setOpenProfile(false);
    };

    const handleProfileDropdown = (e) => {
        e.stopPropagation(); // Preventing event propagation
        setOpenProfile(!openProfile);
        setOpenMenu(false);
    };

    const handleLinkClick = () => {
        setOpenMenu(false);
        setOpenProfile(false);
    };

    return (
        <nav className="bg-white  drop-shadow relative z-50">
            <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8 relative">
                <div className="relative flex h-20 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex space-x-4 items-center md:hidden">
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
                                    <Link key={item.name} href={item.href} onClick={handleLinkClick}
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
                    
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0 ">
                            <div className="flex gap-4">
                                <button
                                    className="md:text-[14px] text-xs rounded-full px-4 md:px-6 capitalize py-1 md:py-2 bg-transparent border-2 border-[#36518F] text-[#36518F] font-medium hover:bg-[#36518F] hover:text-white transition-all duration-75"
                                >
                                    Sign In
                                </button>
                                <button
                                    className="hidden lg:block md:text-[14px] text-xs rounded-full px-6 capitalize py-2 bg-[#FF8B4A] hover:bg-[#FF8000] border-2  text-white font-medium transition-all duration-75"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    
                </div>
            </div>

            {openMenu && (
                <div className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} onClick={handleLinkClick}
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

export default NavbarTemp;

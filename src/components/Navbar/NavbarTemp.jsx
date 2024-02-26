import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from "../../assets/Navbar/logo.png"
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";


const NavbarTemp = () => {
    const pathname = usePathname();
     const isSignInPage = pathname.includes('signin');
    const isSignUpPage = pathname.includes('signup');
    return (
        <nav className="bg-white drop-shadow relative z-50">
            <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8 relative">
                <div className="relative flex h-20 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex space-x-4 items-center md:hidden">
                        <Link href="/">
                        <Image
                            className="w-[120px] h-auto "
                            src={logo}
                            alt="SUZAN"
                        />
                        </Link>
                    </div>
                    <div className="max-md:hidden flex flex-1 items-center justify-center md:items-center md:justify-start">
                        <div className="flex items-center">
                            <Link href="/">
                            <Image
                                className="w-[120px] h-auto"
                                src={logo}
                                alt="SUZAN"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0 ">
                        <div className="flex gap-4">
                            {isSignInPage && (
                                <Link href="/signup">
                                    <button
                                        className="hidden lg:block md:text-[14px] text-xs rounded-full px-6 capitalize py-2 bg-[#FF8B4A] hover:bg-[#FF8000] border-2 text-white font-medium transition-all duration-75"
                                        >
                                        Sign Up
                                    </button>
                                </Link>
                            )}
                            {isSignUpPage && (
                                <Link href="/signin">
                                    <button
                                        className="hidden lg:block md:text-[14px] text-xs rounded-full px-6 capitalize py-2 bg-[#FF8B4A] hover:bg-[#FF8000] border-2 text-white font-medium transition-all duration-75"
                                        >
                                        Sign In
                                    </button>
                                </Link>
                            )}
                            {/* Responsive "Sign Up" or "Sign In" button */}
                            {isSignInPage && (
                                <Link href="/signup">
                                    <button
                                        className="lg:hidden md:text-[14px] text-xs rounded-full px-4 capitalize py-2 bg-[#FF8B4A] hover:bg-[#FF8000] border-2 text-white font-medium transition-all duration-75"
                                        >
                                        Sign Up
                                    </button>
                                </Link>
                            )}
                            {isSignUpPage && (
                                <Link href="/signin">
                                    <button
                                        className="lg:hidden md:text-[14px] text-xs rounded-full px-4 capitalize py-2 bg-[#FF8B4A] hover:bg-[#FF8000] border-2 text-white font-medium transition-all duration-75"
                                        >
                                        Sign In
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarTemp;

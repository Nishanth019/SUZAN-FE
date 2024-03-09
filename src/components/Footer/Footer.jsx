'use client'

import React from 'react';
import { Typography } from "@material-tailwind/react";
import logo from "../../assets/Navbar/logo.png"
import Image from 'next/image';

import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

const SITEMAP = [
    {
        title: "Company",
        links: ["About Us", "Privacy policy", "Help Center", "Testimonials"],
    },
    {
        title: "Services",
        links: ["Courses", "Clubs", "Events", "Nearby Places"],
    },
    {
        title: "Terms",
        links: ["Terms & Conditions ", "Privacy Policy", "Refunds & Cancellations"],
    },
    {
        title: "Contact Us",
        links: ["+91 9177620708", "suzanorganisation@gmail.com"],
    },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <footer className="relative  w-full bg-teal-200 ">
            <div className="mx-auto w-full max-w-7xl px-8  ">
                <div className="md:hidden ">
                    <div>
                        <Image
                            className=" w-[120px] h-auto "
                            src={logo}
                            alt="SUZAN"
                        />
                    </div>
                </div>
                <div className='flex'>
                    <div className="mx-auto grid w-full grid-cols-1 gap-8 py-5 px-2 md:grid-cols-2 lg:grid-cols-4">
                        {SITEMAP.map(({ title, links }, key) => (
                            <div key={key} className="w-full">
                                <Typography
                                    variant="xl"
                                    color="black"
                                    className="mb-4 font-bold uppercase opacity-100"
                                >
                                    {title}
                                </Typography>
                                <ul className="space-y-1">
                                    {links.map((link, key) => (
                                        <Typography key={key} as="li" color="black" className="font-normal">
                                            <a
                                                href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                                            >
                                                {link}
                                            </a>
                                        </Typography>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="max-md:hidden ">
                        <div>
                            <Image
                                className=" w-[200px] h-auto rounded-full"
                                src={logo}
                                alt="SUZAN"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center border-t border-black py-4 md:flex-row md:justify-between">
                    <Typography
                        variant="small"
                        className="mb-4 text-center font-normal text-black md:mb-0"
                    >
                        &copy; {currentYear} <p>Suzan Organisation</p>. All
                        Rights Reserved.
                    </Typography>
                    <div className="flex gap-4 text-black sm:justify-center">


                        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100 transition-transform hover:scale-105">
                            <FaFacebook size={20} />
                        </Typography>

                        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100 transition-transform hover:scale-105">
                            <FaInstagram size={20} />
                        </Typography>

                        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100 transition-transform hover:scale-105">
                        <FaTwitter size={20} />
                        </Typography>

                        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100 transition-transform hover:scale-105">
                            <FaGithub size={20} />
                        </Typography>

                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
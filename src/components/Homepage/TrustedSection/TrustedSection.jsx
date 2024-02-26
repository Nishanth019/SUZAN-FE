'use client'

import React from 'react';
import { TrustedSlider } from './SlickSlider';
const TrustedSection = () => {
    const images = [
        "https://edzer.s3.amazonaws.com/edzer-assets/companies/Subscribe+now+(2).png",
        "https://edzer.s3.amazonaws.com/edzer-assets/companies/Subscribe+now+(3).png",
        "https://edzer.s3.amazonaws.com/edzer-assets/companies/Subscribe+now.png",
        "https://edzer.s3.amazonaws.com/edzer-assets/companies/BITS_Pilani-Logo.svg.png",
        "https://edzer.s3.amazonaws.com/edzer-assets/companies/nmims-university-logo.png",
    ]
    return (
<<<<<<< HEAD
        <div className='flex flex-col  w-full gap-3 pt-10 py-2 lg:pt-16 lg:pb-2 items-center justify-center overflow-hidden'>
            <div className='text-center px-4 md:px-0  md:text-[20px] lg:text-[26px] xl:text-[28px] font-bold'>
=======
        <div className='flex flex-col  w-full gap-3 py-5 lg:py-16 items-center justify-center overflow-hidden'>
            <div className='text-center px-4 md:px-0 text-[16px]  md:text-[20px] lg:text-[26px] xl:text-[28px] font-bold'>
>>>>>>> bf3f33d26146c80b87939b7174f63a2a01d740b7
            Used by <span className='primary-text-color'>5000+ </span> students of various Institutes Worldwide
            </div>
            <div className='px-12 md:w-[85%] lg:w-[80%] py-8 relative'>
                <div className='bg-[#E8FFF9]  hidden md:flex w-full   py-6  md:flex-row flex-col gap-12 md:gap-16 items-center justify-center rounded-md'>
                    {images.map((imgUrl, ind )=> (
                        <div key={ind}>
                            <img src={imgUrl}  alt="" className='w-20 lg:w-24'/>
                        </div>
                    ))}
                </div>
                <div className='bg-[#E8FFF9] px-8 md:hidden md:px-8 py-6 flex gap-12  md:gap-16 items-center justify-center rounded-md'>
                   <TrustedSlider data={images} />
                </div>
            </div>
        </div>
    );
};

export default TrustedSection;

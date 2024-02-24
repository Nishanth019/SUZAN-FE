'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoMdSchool } from "react-icons/io";
import { BsPersonVcard } from "react-icons/bs";
import MainSectionLogo from "../../../assets/Homepage/MainSectionLogo.png";
import play from "../../../assets/Homepage/play.png";

const MainSection = () => {
    return (
        <div className='w-full  items-center justify-center flex flex-row overflow-hidden py-5 md:py-10'>
            <div id='left_container' className='flex-1  flex-col  items-center justify-center w-full h-ful'>
                <div className='w-full flex flex-col justify-center items-center lg:pb-20'>
                    <div className="flex flex-col justify-center items-start space-y-8 md:space-y-10 lg:space-y-16 xl:space-y-20">
                        <div className="relative">
                            <span><IoMdSchool className='text-3xl md:text-5xl  text-[#36518F] leading-tight text-start ' /></span>
                            <h1 className='text-[32px]  md:text-[36px] lg:text-[48px] xl:text-[48px] 2xl:text-[60px] leading-tight text-start font-bold text-[#89A1EF]'>Make Your <span className='secondary-text-color'>College</span></h1>
                            <h1 className='text-[32px]  md:text-[36px] lg:text-[48px] xl:text-[48px] 2xl:text-[60px] leading-tight text-start font-bold primary-text-color'>Journey Easier</h1>
                            <h1 className='text-[32px]  md:text-[36px] lg:text-[48px] xl:text-[48px] 2xl:text-[60px] leading-tight text-start font-bold secondary-text-color'> With  <span><span className='text-[#89A1EF]' >SU</span><span className='secondary-text-color' >ZAN</span></span> </h1>

                    {/*Rounded Shape*/}
                    <div className='absolute top-0 right-[30px] md:right-[70px] flex justify-center items-center w-full overflow-hidden'>
                        <div className='xl:w-[28rem] xl:h-[28rem] lg:w-[22rem] lg:h-[22rem] md:w-[16rem] md:h-[16rem] w-[14rem] h-[14rem]  rounded-full border border-solid border-[#20B486]/30   flex justify-center items-center'>
                            <div className='xl:w-[22rem] xl:h-[22rem] lg:w-[16rem] lg:h-[16rem] md:w-[12rem] md:h-[12rem] w-[10rem] h-[10rem]  rounded-full border border-solid border-[#20B486]/30 flex justify-center items-center '>
                                <div className='xl:w-[16rem] xl:h-[16rem] lg:w-[10rem] lg:h-[10rem] md:w-[8rem] md:h-[8rem] w-[6rem] h-[6rem]  rounded-full border border-solid border-[#20B486]/30 flex justify-center items-center '>
                                    <div className='xl:w-[10rem] xl:h-[10rem] md:w-[4rem] md:h-[4rem] w-[2rem] h-[2rem] rounded-full border border-solid border-[#20B486]/30 flex justify-center items-center '>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        </div>

                        <div className='flex gap-4 lg:gap-8 xl:gap-12 '>
                            <button className='whitespace-nowrap rounded-lg px-3 lg:px-5 text-sm lg:text-lg primary-bg-color font-semibold text-white cursor-pointer'>
                                Lets Explore
                            </button>
                            <div className='flex items-center gap-2 lg:gap-4  '>
                                <button className='primary-bg-color w-[33.96px] h-[34px] md:w-[48.96px] md:h-[48px] flex justify-center items-center rounded-full text-white cursor-pointer'>
                                    <Image src={play} className='w-12' alt="play" />
                                </button>
                                <h3 className='whitespace-nowrap font-semibold text-xs md:text-sm lg:text-lg '>Watch how it works</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='right_container' className=' max-md:hidden flex-1 justify-center items-center w-full'>
                <div className=' flex justify-center items-center  h-full '>
                    <div className='relative px-12'>
                        <div className='md:w-[300px] md:h-[300px] lg:h-[450px] lg:w-[450px] xl:h-[500px] xl:w-[500px]  rounded-full border border-solid border-[#129172] absolute inset-0'></div>
                        <Image src={MainSectionLogo} className='md:w-auto md:h-[300px] lg:h-[450px] lg:w-auto xl:h-[500px] xl:w-auto relative z-[1]' alt="Clg Student" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSection

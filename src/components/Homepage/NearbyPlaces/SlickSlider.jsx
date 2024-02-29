'use client' 

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "@material-tailwind/react";
import { AiOutlineStar } from "react-icons/ai";
import { useRouter } from "next/navigation";
import maggi from "../../../assets/Homepage/maggi.png";
import Image from "next/image";

export const SimpleSlider = () => {
    // Initialize places state with an empty array
    const [places, setPlaces] = useState([]);
    console.log(0,places)
    // Simulated API call to fetch course data
    useEffect(() => {
        // Mock data for demonstration
        const mockData = [{
            "_id": "6548ef7ada631a79fde4e152",
            "picture": "https://edzer.blob.core.windows.net/assets/finance-investment-banking-cost-concept_53876-133721.jpg",
            "title": "MAMA Maggie Point",
            "chapters": ['655eddfcdd0eccb69be83e36', '655edf94dd0eccb69be83e3b', '655edfebdd0eccb69be83e3d'],
            "createdAt": "2023-11-06T13:51:54.179Z",
            "description": "This course provides a comprehensive journey into personal finance management, ideal for those with no prior finance or accounting experience. It covers a wide range of essential topics including budgeting, debt management, investment, and tax planning, empowering individuals to take charge of their financial health and achieve their personal financial goals."
        },
        {
            "_id": "6548ef7ada631a79fde4e152",
            "picture": "https://edzer.blob.core.windows.net/assets/finance-investment-banking-cost-concept_53876-133721.jpg",
            "title": "MAMA Maggie Point",
            "chapters": ['655eddfcdd0eccb69be83e36', '655edf94dd0eccb69be83e3b', '655edfebdd0eccb69be83e3d'],
            "createdAt": "2023-11-06T13:51:54.179Z",
            "description": "This course provides a comprehensive journey into personal finance management, ideal for those with no prior finance or accounting experience. It covers a wide range of essential topics including budgeting, debt management, investment, and tax planning, empowering individuals to take charge of their financial health and achieve their personal financial goals."
        },
        {
            "_id": "6548ef7ada631a79fde4e152",
            "picture": "https://edzer.blob.core.windows.net/assets/finance-investment-banking-cost-concept_53876-133721.jpg",
            "title": "MAMA Maggie Point",
            "chapters": ['655eddfcdd0eccb69be83e36', '655edf94dd0eccb69be83e3b', '655edfebdd0eccb69be83e3d'],
            "createdAt": "2023-11-06T13:51:54.179Z",
            "description": "This course provides a comprehensive journey into personal finance management, ideal for those with no prior finance or accounting experience. It covers a wide range of essential topics including budgeting, debt management, investment, and tax planning, empowering individuals to take charge of their financial health and achieve their personal financial goals."
        },
        {
            "_id": "6548ef7ada631a79fde4e152",
            "picture": "https://edzer.blob.core.windows.net/assets/finance-investment-banking-cost-concept_53876-133721.jpg",
            "title": "MAMA Maggie Point",
            "chapters": ['655eddfcdd0eccb69be83e36', '655edf94dd0eccb69be83e3b', '655edfebdd0eccb69be83e3d'],
            "createdAt": "2023-11-06T13:51:54.179Z",
            "description": "This course provides a comprehensive journey into personal finance management, ideal for those with no prior finance or accounting experience. It covers a wide range of essential topics including budgeting, debt management, investment, and tax planning, empowering individuals to take charge of their financial health and achieve their personal financial goals."
        },
        {
            "_id": "6548ef7ada631a79fde4e152",
            "picture": "https://edzer.blob.core.windows.net/assets/finance-investment-banking-cost-concept_53876-133721.jpg",
            "title": "MAMA Maggie Point",
            "chapters": ['655eddfcdd0eccb69be83e36', '655edf94dd0eccb69be83e3b', '655edfebdd0eccb69be83e3d'],
            "createdAt": "2023-11-06T13:51:54.179Z",
            "description": "This course provides a comprehensive journey into personal finance management, ideal for those with no prior finance or accounting experience. It covers a wide range of essential topics including budgeting, debt management, investment, and tax planning, empowering individuals to take charge of their financial health and achieve their personal financial goals."
        }];

        // Set places state with mock data
        setPlaces(mockData);
    }, []);

    const router = useRouter();

    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                },
            },
        ]
    };

    return (
        <div className="">
            <Slider {...settings}>
                {places.map((ele, index) => (
                    <div key={index} className="flex justify-center h-[320px] items-center cursor-pointer">
                        <Card onClick={() => router.push(`/course/${ele._id}`)} className="w-[242.75px] h-[289.64px] !shadow-md !shadow-black flex flex-col m-auto">
                            <div className="h-[149.88px] w-full">
                                <Image src={maggi} alt="" className="h-[149.88px] w-full" />
                            </div>
                            <div className="flex flex-col gap-4 pt-1">
                                <div className="flex px-2 gap-4">
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-[14.71px] font-bold">{ele.title}</h3>
                                    </div>
                                    <div className="text-xl">
                                        {'>'}
                                    </div>
                                </div>
                                <div className="flex text-[10px] px-2 font-bold gap-2 justify-start items-center">
                                    <h4 className="p-1 bg-[#48B33F] rounded-lg px-3 text-white">open</h4>
                                </div>
                                <div className="absolute bottom-[10px] flex text-[9.2px] w-full justify-start px-3 gap-4 items-start">
                                    <div className="flex gap-1 items-center">
                                        <AiOutlineStar />
                                        <div>{ele.chapters?.length} stars</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

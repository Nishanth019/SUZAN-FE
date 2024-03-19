"use client";
import React, { useEffect, useState } from "react";
import Input from "../Generals/Input";
import { useRouter } from "next/navigation";
import UserService from "@/services/user.service";
import collegeService from "@/services/college.service";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
const CoursesCard = ({ CourseDetails, setCourseDetails }) => {
    const [isSaved, setIsSaved] = useState(false);

    const handleClick = () => {
        setIsSaved(!isSaved);
    };
    return (
        <>
            <div className="flex justify-center">
                <div className="grid gap-4 w-1/2 m-3">
                    <div className="rounded-lg bg-white ">
                        <div className="p-4 grid gap-2">
                            <div className="flex justify-between ">


                                <div className="flex-col mb-4 ">
                                    <h3 className="flex text-lg font-semibold">{CourseDetails.course_name}</h3>
                                    <p className="flex text-sm text-gray-500">{CourseDetails.course_code}</p>

                                </div>
                                <div className="flex">
                                    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                        {isSaved ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} {/* Adjust size as needed */}
                                        {/* Add any additional content or functionality for your save button */}
                                    </div>
                                    <div className="px-2">Save</div>
                                </div>
                            </div>
                            <div className="flex justify-between whitespace-nowrap gap-4 text-sm w-1/2 text-gray-600 ">
                                <div className="flex px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto" />
                                    <span>Credits: {CourseDetails.credits}</span>
                                </div>
                                <div className="flex px-3 py-1 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto  h-auto" />
                                    <span>Credits: {CourseDetails.credits}</span>
                                </div>
                                <div className="flex px-2 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto" />
                                    <span>Type: {CourseDetails.course_type}</span>
                                </div>
                                <div className="flex px-2 items-center rounded-lg bg-gray-200">
                                    <div className="w-auto h-auto" />
                                    <span>Prof:  {CourseDetails.course_professor}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default CoursesCard;

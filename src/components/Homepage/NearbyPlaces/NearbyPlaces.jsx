"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {SimpleSlider}  from "./SlickSlider";
import leftCircle from "../../../assets/Homepage/placesLeftCircle.png"
import rightCircle from "../../../assets/Homepage/placesRightCircle.png"
import Image from "next/image"

const NearbyPlaces = () => {
  const [tab, setTab] = useState(0);
  const navigate = useRouter();
  const handleClick = (e, i) => {
    e.preventDefault();
    setTab(i);
  };
  return (
    <div className="flex flex-col w-full gap-10 md:gap-16 items-center justify-center relative pt-5 pb-8 lg:py-16 ">
      <div className="flex flex-col w-full gap-8 items-center justify-center">
        <div className="relative   w-fit leading-tight text-center">
          <h1 className="text-[24px] sm:text-[48px] m-auto  w-fit  leading relative flex flex-col justify-center items-center gap-4 font-bold  px-2">
            <span className="border-2 absolute border-solid border-yellow-300 w-16 bottom-0 md:w-32 md:bottom-2 right-0 z-[-1]"></span>
            <span className="text-[16px] md:text-[30px] sm:text-[20px] relative ">
              {" "}
              <span className="border-[2px] md:border-[3px] absolute border-solid border-[#60B5A0] w-28 bottom-0 md:w-32 md:bottom-[2px] left-0 z-[-1] "></span>
              Explore The Places in your City
            </span>
            <span className="text-[26px] md:text-[36px] lg:text-[42px] xl:text-[48px]">
            Start Exploring {" "}
              <span>
                <span className="primary-text-color">Nearby </span>
                <span className="secondary-text-color">Places</span>
              </span>{" "}
              Today
            </span>
          </h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-30 z-[10]">
        <button
          className={`w-56  shadow-[0_19px_30px_3px_rgba(0,0,0,0.2)]  p-3 md:p-4 px-5 flex gap-4 items-center rounded-lg ${
            tab === 0 ? "primary-bg-color text-white" : ""
          }`}
          onClick={(e) => handleClick(e, 0)}
        >
          <span className="relative flex justify-center items-center">
            <div
              className={`absolute border-2 border-solid border-slate-400 rounded-full w-4 h-4  ${
                tab === 0 ? "border-white" : ""
              }`}
            ></div>
            <div
              className={`absolute bg-slate-400 rounded-full w-2 h-2  ${
                tab === 0 ? "border-white bg-white" : ""
              }`}
            ></div>
          </span>
          <span className="max-md:text-[15px] md:text-[18px] w-full font-bold">Restaurants</span>
        </button>
        <button
          className={`w-56 shadow-[0_19px_30px_3px_rgba(0,0,0,0.2)]  p-3 md:p-4 px-5 flex gap-4 items-center rounded-lg  ${
            tab === 1 ? "primary-bg-color text-white " : ""
          }`}
          onClick={(e) => handleClick(e, 1)}
        >
          <span className="relative flex justify-center items-center">
            <div
              className={`absolute border-2 border-solid border-slate-400 rounded-full w-4 h-4  ${
                tab === 1 ? "border-white" : ""
              }`}
            ></div>
            <div
              className={`absolute bg-slate-400 rounded-full w-2 h-2  ${
                tab === 1 ? "border-white bg-white" : ""
              }`}
            ></div>
          </span>
          <span className="max-md:text-[15px] md:text-[18px] w-full font-bold">Devotional places</span>
        </button>
        <button
          className={`w-56 shadow-[0_19px_30px_3px_rgba(0,0,0,0.2)] p-3 md:p-4 px-5 flex gap-4  items-center rounded-lg  ${
            tab === 2 ? "primary-bg-color text-white" : ""
          }`}
          onClick={(e) => handleClick(e, 2)}
        >
          <span className="relative flex justify-center items-center">
            <div
              className={`absolute border-2 border-solid border-slate-400 rounded-full w-4 h-4  ${
                tab === 2 ? "border-white" : ""
              }`}
            ></div>
            <div
              className={`absolute bg-slate-400 rounded-full w-2 h-2  ${
                tab === 2 ? "border-white bg-white" : ""
              }`}
            ></div>
          </span>
          <span className="max-md:text-[15px] md:text-[18px] w-full font-bold">Local Highlights</span>
        </button>
      </div>
      <div className="w-full flex relative justify-center items-center ">
      <div className="max-lg:hidden absolute top-[-120px] left-0">
          <Image src={leftCircle} alt="" />
        </div>
        <div className="max-lg:hidden absolute top-[-120px] right-0">
          <Image src={rightCircle} alt="" />
        </div>
        <div className="w-[100%] md:w-[90%] lg:w-[85%] xl:w-[80%] 2xl:w-[75%] max-w-[1200px]">
          {tab === 0 && <SimpleSlider />}
          {
            // tab===1&&<CategorySlider />
            tab === 1 && <SimpleSlider />
          }
          {tab === 2 && <SimpleSlider />}
        </div>
      </div>
      <div>
        <button
          className="primary-bg-color text-white font-bold text-[15px] md:text-[18px] px-10 md:px-16 py-2 md:py-3 rounded-lg"
          onClick={() => {
            navigate.push("/courses");
          }}
        >
          View all Places
        </button>
      </div>
    </div>
  );
};

export default NearbyPlaces;

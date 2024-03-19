"use client";
import React from "react";
import nishanth from "@/assets/CoreTeam/nishanth.jpg";
const lybaPic =
  "https://careplus-bucket.s3.ap-south-1.amazonaws.com/1cca4aab09331644e4397364b92deee5a3a8888a6a7d630a4ac4e330e30f0dcd-lyba.jpg";
const animeshPic =
  "https://careplus-bucket.s3.ap-south-1.amazonaws.com/8cb08ccc5a14d14cb5e3932bcf4c610d6137ad1d08207c3897cb339d9d865b11-animesh.jpeg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

const team = [
  {
    name: "Manish Chandolu",
    position: "IT Consultant (Tech Partner)",
    image: nishanth,
    description:
      "Behind every breakthrough at EDZER is Animesh, blending vision with cutting-edge innovation. Steering our technological pursuits, he ensures we remain at the forefront, crafting solutions that resonate with today's learners.",
  },
  {
    name: "Nishanth Bhukya",
    position: "Tech Lead",
    image: nishanth,
    description:
      "Shivam is the code maestro, the architect behind our seamless and efficient platform. With years of expertise, he dives deep into the intricacies, ensuring every solution is top-notch and evolves with the tech landscape.",
  },
  {
    name: "Satwik Banda",
    position: "Business Analyst",
    image: nishanth,
    description:
      "The lynchpin of our project, Lyba Khan seamlessly bridges the gap between vision and execution. With meticulous precision, she ensures every task runs smoothly, is on-time, and exceeds expectations.",
  },
];

const CoreTeamSection = () => {
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: true,
    slidesToShow: 3,
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
    ],
  };

  return (
    <div className="pb-6 overflow-hidden">
      <div className="flex justify-center pt-[1rem] md:pt-[3rem]">
        <div className="flex justify-center flex-col gap-6">
          <h2 className="text-[#3F4B52] font-[600] leading-[32px] text-[32px] text-center">
            {" "}
            Our Core <span className="border-b-4 border-[#6CFEF5]">Team</span>
          </h2>
          <p className="text-center text-[#36518F] font-[400] leading-[24px] sm:text-[20px] text-[16px] sm:w-[776px] w-full px-4">
            At SUZAN, our legion of dream-weavers and trailblazers is unmatched.
            Committed and driven, they turn aspirations into achievements.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-10">
        <Slider {...settings}>
          {team.map((member, index) => (
            <div key={index} className="cursor-pointer group">
              <div className="flex relative justify-center align-middle items-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="rounded-2xl h-[306px] w-[262.129px] overflow-hidden">
                  {/* <Image src={play} className='w-12' alt="play" /> */}
                  <Image
                    className="w-full h-full object-cover"
                    src={member.image}
                    alt={member.name}
                  />
                </div>
                <div className="absolute bottom-0 p-3 text-start">
                  <h2 className="text-[#FFF] text-[17.54px] font-[500] leading-[26px]">
                    {member.name}
                  </h2>
                  <p className="text-[#FFF] text-[15.355px] font-[400] leading-[18px]">
                    {member.position}
                  </p>
                </div>
                <div class="absolute h-full w-[263px] rounded-2xl flex justify-center  bg-gray-600 px-3 py-2 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div class="flex flex-col gap-y-3 justify-center">
                    <span className="">
                      <RiDoubleQuotesL />
                    </span>
                    <p class="text-[15px] leading-[24px] text-center">
                      {member.description}
                    </p>
                    <span className="ml-auto">
                      <RiDoubleQuotesR />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CoreTeamSection;

"use client";
import React from "react";
import nishanth from "@/assets/CoreTeam/nishanth.jpg";
import manish from "@/assets/CoreTeam/manish.jpeg";
import satwik from "@/assets/CoreTeam/satwik.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

const team = [
  {
    name: "Manish Chandolu",
    position: "Backend Developer",
    image: manish,
    description:
      "Manish is the backbone of our tech stack, building and maintaining the systems that power SUZAN. With a deep understanding of server-side technologies, he ensures our platform is scalable, secure, and capable of handling the growing demands of our users.",
  },
  {
    name: "Nishanth Bhukya",
    position: "Tech Lead",
    image: nishanth,
    description:
      "As the Tech Lead, Nishanth is the visionary guiding the team through technical challenges. His expertise in both front-end and back-end development allows him to architect solutions that are robust, innovative, and future-proof, driving SUZANs technical excellence.",
  },
  {
    name: "Satwik Banda",
    position: "Frontend Developer",
    image: satwik,
    description:
      "Satwik is the creative force behind SUZAN user interface. With his keen eye for design and proficiency in frontend technologies, he ensures a smooth, intuitive, and visually appealing user experience that delights every visitor to our platform.",
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

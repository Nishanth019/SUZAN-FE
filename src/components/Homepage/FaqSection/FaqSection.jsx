'use client'
import React, {useState} from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Image from 'next/image';
import bulb from "../../../assets/Homepage/bulb.png";
import star from "../../../assets/Homepage/Star.png";
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      id: 1,
      question: "What is Suzan?",
      answer: [
        "Suzan is a college community platform where students can find course details, events, clubs, and nearby hangout spots.",
      ],
    },
    {
      id: 2,
      question: "How do I create an account on Suzan?",
      answer: [
        "Click on the 'Sign Up' button and follow the instructions to create an account using your college email.",
      ],
    },
    {
      id: 3,
      question: "How can I register my college on Suzan?",
      answer: [
        "One student from your college must sign up as an admin and register the college. This admin will then input all relevant college data.",
      ],
    },
    {
      id: 4,
      question: "Who can register as an admin?",
      answer: [
        "Any student from the college can register as an admin. The admin is responsible for entering and maintaining college-related data.",
      ],
    },
    {
      id: 5,
      question: "How many admins can register fo a college?",
      answer: [
        "First one student can register as an admin for a college. However, the admin can add maximum 4 other students as admins to help manage the college data.",
      ],
    },
    {
      id: 6,
      question: "What information can I find on Suzan?",
      answer: [
        "You can find details about your courses, college events, clubs, and suggestions for nearby hangout places",
      ],
    },
    {
      id: 7,
      question: "Is there a mobile app for Suzan?",
      answer: [
        "Currently, Suzan is available as a website. A mobile app is in development and will be released soon.",
      ],
    },
    {
      id: 8,
      question: "How do I report an issue or give feedback?",
      answer: [
        "You can report issues or provide feedback through the 'Contact Us' section on the website.",
      ],
    },
  ];

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="py-5 sm:py-16 lg:py-24">
    <div className="lg:flex lg:justify-between lg:px-36 lg:pb-5">
      <p className="text-[30px] sm:text-[36px] lg:text-[42px] xl:text-[50px] font-bold max-lg:text-center">FAQ's</p>
        <Image src={star} className='w-20 h-20 max-lg:hidden' alt="star" />

    </div>
    <section className="flex  ">
      <div className="flex-1 max-lg:hidden  relative   ">
        <div className="max-lg:hidden ">
           <Image src={star} className='w-20 h-20 absolute top-10 left-10' alt="star" />
           <Image src={bulb} className=' w-fit absolute top-[150px] left-[50px]' alt="bulb" />
           <Image src={star} className='w-20 h-20 absolute top-[600px] right-20' alt="star" />

        </div>
      </div>
      <div className="px-4 mx-auto sm:px-6 lg:px-8  flex-1 xl:pr-24">
        <div className=" mx-auto mt-8 space-y-7 md:mt-10 ">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="transition-all duration-200 bg-white border-2 border-[#003482] hover:bg-gray-50 rounded-lg"
            >
              <button
                type="button"
                onClick={() => toggleAnswer(faq.id)}
                className="flex items-center justify-between gap-3 sm:gap-5 w-full px-3 py-1 sm:p-3"
              >
                <span className="flex text-sm  sm:text-lg font-semibold text-black text-left">
                  {faq.question}
                </span>
                <div className="w-4 h-4 sm:pr-5 sm:w-6 sm:h-6">
                {openIndex === faq.id ? (
                  <IoIosArrowUp className="w-4 h-4  sm:w-6 sm:h-6 text-white bg-[#003482] rounded-full border-[#003482]" />
                ) : (
                  <IoIosArrowDown className="w-4 h-4  sm:w-6 sm:h-6 text-white bg-[#003482] rounded-full border-[#003482]" />
                )}
                </div>
              </button>
              <div
                id={`answer${faq.id}`}
                style={{ display: openIndex === faq.id ? 'block' : 'none' }}
                className="px-4 pb-5 sm:px-6 sm:pb-6 text-sm md:text-base"
              >
                <ul>
                  {faq.answer.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>

  );
};

export default FaqSection;

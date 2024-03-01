'use client'
import React, {useState} from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Image from 'next/image';
import bulb from "../../../assets/Homepage/bulb.png";
import star from "../../../assets/Homepage/star.png";
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      id: 1,
      question: 'Is there support available if I have questions during my subscription?',
      answer: [
        'Absolutely. During your subscription, you\'ll have the opportunity to engage with our experts in various Q&A sessions, where you can freely ask any questions you may have.Additionally, members have access to our dedicated WhatsApp support for prompt resolution of any queries.',
      ],
    },
    {
      id: 2,
      question: 'What makes EDZER Edge different from other interview prep platforms?',
      answer: [
        'At EDZER Edge, we pride ourselves on the reliability and authenticity of our information. Unlike random online videos or free apps, our content is meticulously crafted by a team of seasoned professionals, including MNC recruiters, startup founders, and senior corporate executives. Our workshops are conducted by industry veterans who have a proven track record of guiding thousands to their dream jobs.'
      ],
    },
    {
      id: 3,
      question: 'How often are the workshops conducted?',
      answer: [
        'We host 4-5 workshops each month, covering a variety of topics designed to enhance your candidacy and secure your dream job. These sessions are integral to our commitment to providing continuous learning and development.',
      ],
    },
    {
      id: 4,
      question: 'What is the cancellation and refund policy?',
      answer: [
        'Our policy allows for cancellation and a full refund only before your first workshop. Once you have attended a workshop, we are unable to offer a refund, as you have already begun to benefit from our expert services.',
      ],
    },
     {
      id: 5,
      question: 'Can I upgrade or downgrade my plan after purchase?',
      answer: [
        'Yes, you have the flexibility to either upgrade or downgrade your plan. For detailed information and assistance, please connect with our team via WhatsApp Chat.',
      ],
    },
    {
      id: 6,
      question: 'Are there any additional costs apart from the plan prices?',
      answer: [
        'The pricing for EDZER Edge access and workshops is all-inclusive, with no hidden fees. However, we offer a range of other services such as specialized courses, Resume Diagnostic reports, and hiring assistance, which are available at additional costs.',
      ],
    },
    {
      id: 7,
      question: 'How do I choose the right plan for me?',
      answer: [
        'Choosing the right plan depends on your individual career stage and needs:',
        'Students seeking internships: The annual plan is recommended to ensure you are fully prepared for placement season.',
        'Job seekers planning to apply next year: Opt for the half-yearly plan to get job-ready.',
        'Professionals needing minor guidance: The quarterly plan is ideal for fine-tuning your skills.',
        'New users exploring the platform: The monthly plan offers a great way to experience our offerings.',
      ],
    },
    {
      id: 8,
      question: 'What does each pricing plan include?',
      answer: [
        'Each plan grants you access to the EDZER Edge interview preparation resources for the duration of your subscription. Additionally, you gain complimentary access to all our in-house paid workshops related to interview preparation for the duration of your plan.',
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
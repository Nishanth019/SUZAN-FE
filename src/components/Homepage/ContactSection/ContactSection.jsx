'use client'
import React, {useState} from 'react';
import toast from "react-hot-toast";
import Image from 'next/image';
import WhatsappQr from '../../../assets/Contact/WhatsappQr.jpeg'
import feedbackService from '@/services/feedback.service';
import { useGlobalContext } from "@/context/AuthContext";

const ContactSection = () => {

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    message: '',
  });
  const { isAuth } = useGlobalContext();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //only allow if there is a user logged in
      
      
      if(!isAuth){
        toast.error('Please login to send message', {
          position: 'top-center',
          autoClose: 3000, // Auto close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      const { data } = await feedbackService.createFeedback(formData);

      //  await ContactInfoService.createContactInfo(formData);
      toast.success('Message sent successfully!', {
        position: 'top-center',
        autoClose: 3000, // Auto close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setFormData({
        fullname: '',
        email: '',
        mobile: '',
        message: '',
      });
    } catch (error) {
      // Handle errors if needed
      console.error('Failed to send message', error);
      toast.error('Failed to send message. Please try again later.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const whatsappLink = "https://wa.me/qr/2CPNC6GSFO5VH1";
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pt-10 sm:pt-20 pb-16 flex items-center justify-around ">
      <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-2 gap-y-8 md:gap-x-8 md:gap-y-8 lg:gap-x-8 lg:gap-y-16 xl:ml-[100 px]">
        <div className="flex-1">
          <p className="font-bold pb-4 text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Feel free to share your feedback or queries.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                required
                type="text"
                placeholder="Full Name"
                autoComplete="false"
                className="w-full px-3 py-2 border border-[#129172] rounded-xl outline-none bg-[#E3EDEB] text-sm sm:text-base lg:text-lg "
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                required
                type="email"
                placeholder="Email Address"
                autoComplete="false"
                className="w-full px-3 py-2 border border-[#129172] rounded-xl outline-none bg-[#E3EDEB] text-sm sm:text-base lg:text-lg"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                required
                type="tel"
                placeholder="Mobile Number"
                autoComplete="false"
                className="w-full px-3 py-2 border border-[#129172] rounded-xl outline-none bg-[#E3EDEB] text-sm sm:text-base lg:text-lg"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <textarea
                required
                placeholder="Your Message"
                className="w-full px-3 py-2 border border-[#129172] rounded-xl outline-none h-36 bg-[#E3EDEB] text-sm sm:text-base lg:text-lg"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-10 py-2 text-white transition-colors bg-[#36518F] rounded-xl max-md:w-full text-sm sm:text-base lg:text-lg"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="xl:flex-1 max-md:mx-2 md:mx-10">
        <div className="bg-[#129172] rounded-xl py-8 mt-10 h-[max-content] flex flex-col items-center justify-between space-y-10 xl:pb-20 xl:w-[500px] ">
          <div className=" text-white font-semibold text-xl text-center sm:text-2xl sm:px-5 ">Reach out to us on Whatsapp!</div>
          <div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Image className="w-[200px] h-fit" src={WhatsappQr} alt="WhatsApp Scanner Code"/>
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default ContactSection;
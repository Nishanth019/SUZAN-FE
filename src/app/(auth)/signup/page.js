'use client'
import React from 'react';
import { School as GraduationCap, Business as Building2, ArrowForward as ArrowRight } from '@mui/icons-material';
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const StudentIllustration = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <circle cx="100" cy="100" r="90" fill="#EFF6FF" />
    <circle cx="100" cy="70" r="35" fill="#60A5FA" />
    <rect x="65" y="115" width="70" height="60" rx="5" fill="#3B82F6" />
    <circle cx="100" cy="70" r="25" fill="#93C5FD" />
    <path d="M65 140 C65 100 135 100 135 140" fill="#2563EB" />
    <circle cx="85" cy="65" r="5" fill="white" />
    <circle cx="115" cy="65" r="5" fill="white" />
  </svg>
);

const CollegeIllustration = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect x="40" y="80" width="120" height="80" fill="#ECFDF5" />
    <rect x="60" y="40" width="80" height="40" fill="#10B981" />
    <rect x="90" y="20" width="20" height="20" fill="#059669" />
    <rect x="50" y="100" width="20" height="20" fill="#34D399" />
    <rect x="90" y="100" width="20" height="20" fill="#34D399" />
    <rect x="130" y="100" width="20" height="20" fill="#34D399" />
    <rect x="50" y="130" width="20" height="30" fill="#059669" />
    <rect x="90" y="130" width="20" height="30" fill="#059669" />
    <rect x="130" y="130" width="20" height="30" fill="#059669" />
  </svg>
);

const SignUp = () => {
  const router = useRouter();

  const { isAuth} = useGlobalContext();

    if (isAuth) {
      router.push("/");
    }

    const handleStudentClick = () => {
      console.log('Navigate to student signup');
      // Navigate to the student signup page
      router.push('/signup/student');
    };
    
    const handleCollegeClick = () => {
      console.log('Navigate to college registration');
      // Navigate to the college registration page
      router.push('/signup/admin');
    };
    

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl  font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 mb-6">
            Join Our Educational Platform
          </h1>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-32 mt-8">
          {/* Student Card */}
          <div className="group relative overflow-hidden bg-white max-w-md w-full p-6 sm:p-8 md:p-10 rounded-xl transition-all duration-300 shadow-md border hover:shadow-lg hover:border-blue-200">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 sm:mb-6 lg:mb-8">
                <StudentIllustration />
              </div>
              <div className="text-center mb-2 sm:mb-4 lg:mb-6">
                <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 lg:mb-8">
                  <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Student Sign Up</h2>
                </div>
                <button
                  className="w-full text-sm sm:text-lg lg:text-xl py-2 sm:py-3  px-4 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 rounded-md flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
                  onClick={handleStudentClick}
                >
                  <span>Sign Up Now</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* College Registration Card */}
          <div className="group relative overflow-hidden bg-white max-w-md w-full p-6 sm:p-8 md:p-10 rounded-xl transition-all duration-300 shadow-md border hover:shadow-lg hover:border-emerald-200">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 mb-4 sm:mb-6 lg:mb-8">
                <CollegeIllustration />
              </div>
              <div className="text-center mb-2 sm:mb-4 lg:mb-6">
                <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 lg:mb-8">
                  <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Register College</h2>
                </div>
                <button
                  className="w-full text-sm sm:text-lg lg:text-xl py-2 sm:py-3 px-4 bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-300 rounded-md flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
                  onClick={handleCollegeClick}
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Already have an account? */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            Already have an account?{' '}
            <a
              href="/signin"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

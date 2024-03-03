'use client'
import React from "react";
import Link from "next/link";
import  { Button }  from "@material-tailwind/react";
import Image from "next/image";

const SignIn = () => {
  return (
    <div className="">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex  items-center justify-center w-full  ">
          <div className="flex   flex-col items-center w-full sm:w-[500px] p-3 py-12 sm:py-3">
            <form className="flex border flex-col shadow-lg w-full h-full pb-6 text-center bg-white rounded-3xl  p-4 md:p-12 ">
              <h3 className="mb-3  text-[30px]  md:text-[40px] lg:text-[48px] xl:text-[48px] font-extrabold text-dark-grey-900">
                Sign In
              </h3>
              <p className="mb-4 text-grey-700">
                Enter your email and password
              </p>

              <label
                htmlFor="email"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="mail@gmail.com"
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border border-gray-300 p-10"
                required
              />
              <label
                htmlFor="password"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Password*
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter a password"
                className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border border-gray-300 p-10"
                required
              />
              <div className="flex flex-row justify-end mb-8">
                <Link
                  href=""
                  className="mr-4 text-sm font-medium text-purple-blue-500 text-blue-600 hover:text-blue-900"
                >
                  Forget password?
                </Link>
              </div>
              <Button className="w-full px-3 py-5 mt-10 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-purple-blue-100 bg-blue-400 border border-gray-300 md:px-12  ">
                Sign In
              </Button>

              <p className="text-sm leading-relaxed text-grey-900">
                Not registered yet?{" "}
                <Link
                  href="signup"
                  className="font-bold  text-blue-600 hover:text-blue-900"
                >
                  Create an Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

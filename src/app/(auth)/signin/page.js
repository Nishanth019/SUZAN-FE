"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import authService from "@/services/auth.service";

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const { isAuth, user, setIsAuth, setUser } = useGlobalContext();
  
  if(isAuth){
    router.push('/')
  }
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
      // Validation passed, you can proceed with form submission
      const { data } = await authService.signIn({ email, password });

      console.log(1, data);

      // Set authentication state to true and set user information after successful login
      setIsAuth(true);
      setUser(data.user);
      console.log(isAuth, user);
      router.push("/");
      console.log("Email:", email);
      console.log("Password:", password);
      setError("");
    } catch (error) {
      // Validation failed
      setError("");
      console.log(12,error)
      console.log(1, error?.response?.data?.message);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
    }
  };

  return (
    <div className="">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex  items-center justify-center w-full  ">
          <div className="flex   flex-col items-center w-full sm:w-[500px] p-3 py-12 sm:py-3">
            <form
              onSubmit={handleSubmit}
              className="flex border flex-col shadow-lg w-full h-full pb-6 text-center bg-white rounded-3xl  p-4 md:p-12 "
            >
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
                value={email}
                onChange={handleEmailChange}
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

              <div>
                <div class="mb-4 flex">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter a password"
                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border border-gray-300 p-10"
                    required
                  />
                  <span class="flex justify-around items-center cursor-pointer" onClick={handleTogglePassword}>

                    {!showPassword ? (
                      <FaEyeSlash class="absolute mr-12 mb-5"  />
                    ) : (
                      <FaEye class="absolute mr-12 mb-5 "  />
                    )}
                  </span>
                </div>
              </div>

             

              <div className="flex flex-row justify-end mb-8">
                <Link
                  href=""
                  className="mr-4 text-sm font-medium text-purple-blue-500 text-blue-600 hover:text-blue-900"
                >
                  Forget password?
                </Link>
              </div>
              <div className=" flex gap-4 flex-col pb-2">
                <p className="text-red-500 text-sm  text-center">{error}</p>
                <button
                  className="text-center bg-blue-400 text-white hover:bg-blue-500 hover:text-white font-semibold p-2 sm:p-4 w-full rounded-full"
                  type="submit"
                >
                  Sign In
                </button>
              </div>

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

"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import toast from "react-hot-toast";
import { useGlobalContext } from "@/context/AuthContext";

const AdminSignup = () => {

  const [show, setShow] = useState(false);
  const [formPrefillData, setFormPrefillData] = useState();
  const [tab, setTab] = useState(0);
  const [timer, setTimer] = useState(30);
  const [showOtpField, setShowOtpField] = useState(true);
  const [canResend, setCanResend] = useState(false);
  const [error, setErrors] = useState("");
  
  const router = useRouter();
  const { isAuth } = useGlobalContext();

  if (isAuth) {
    router.push("/");
  }

  const handleClick = () => setShow(!show);

  const handleOtpForSignUp = (values) => {
    console.log(values);
    setShowOtpField(true);
    setCanResend(false);
    setTimer(30);
  };

  const loginForm = useFormik({
    initialValues: {
      name: formPrefillData ? formPrefillData.name : "",
      email: formPrefillData ? formPrefillData.email : "",
      password: formPrefillData ? formPrefillData.password : "",
      otp: formPrefillData ? formPrefillData.otp : "",
    },

    onSubmit: async (values) => {
      if (!values.email) return setErrors("Email Required!");
      if (!values.password || !Boolean(values.password?.trim()))
        return setErrors("Password Required!");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        return setErrors("Invalid Email");
      }
      if (values.password.length < 8) {
        return setErrors("Password must be at least 8 characters");
      }

      if (tab === 0) {
        if (!values.name) {
          return setErrors("Full Name Required!");
        }
        // signup
        try {
          const payload = {
            name: values.name,
            email: values.email,
            password: values.password,
            role: "mainadmin",
          };
          const data = await authService.signUpAdmin(payload);

          if (data.data.message === "OTP is already Verified") {
            router.push(`/signup/admin/registration/${data.data.id}`);
          } else {
            toast.success(data.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setTab(1);
          }
          setErrors("");
        } catch (error) {
          toast.error(error.response?.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }

      if (tab === 1) {
        try {
          const payload = {
            otp: values.otp,
            email: values.email,
          };
          const data = await authService.verifyOtpForAdmin(payload);
          toast.success(data.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          router.push(`/signup/admin/registration/${data.data.id}`);
        } catch (error) {
          setErrors("");
          toast.error(error.response?.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    },
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const resendOtp = async () => {
    try {
      const payload = { email: loginForm.values.email };
      const response = await authService.sendOtp(payload);

      if (response) {
        toast.success("OTP sent successfully");
        setShowOtpField(true);
        setCanResend(false);
        setTimer(30); 
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Error occurred", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col px-3 ">
      <main>
        {tab === 0 ? (
          <div className="w-full  flex items-center justify-center  py-12 sm:py-3">
            <div className=" flex border flex-col bg-white rounded-2xl shadow justify-center items-center py-12 w-full sm:w-[500px]">
              <div className="font-bold  tracking-wide justify-center mb-7  text-[30px]  md:text-[40px] lg:text-[48px] xl:text-[48px] ">
                Admin Signup
              </div>
              <div className="flex flex-col justify-center gap-7 w-[80%]">
                <div className="space-y-3 w-full gap-y-10">
                  <p className="text-[#676767]">Email ID</p>
                  <input
                    type="text"
                    name="email"
                    value={loginForm.values.email}
                    onChange={(e) => {
                      loginForm.handleChange(e);
                    }}
                    error={
                      loginForm.touched.email && Boolean(loginForm.errors.email)
                    }
                    placeholder="Enter College Email ID"
                    className="rounded-full border border-[#E0E0E0] w-full p-3 max-sm:text-sm"
                  />
                </div>
                <div className="space-y-3 w-full">
                  <p className="text-[#676767]">Password</p>
                  <div className="flex flex-row items-center relative w-full">
                    <input
                      type={`${show ? "password" : "text"}`}
                      name="password"
                      value={loginForm.values.password}
                      onChange={loginForm.handleChange}
                      error={
                        loginForm.touched.password &&
                        Boolean(loginForm.errors.password)
                      }
                      placeholder="Must be min 8 characters"
                      className="rounded-full border border-[#E0E0E0] p-3 w-full  max-sm:text-sm"
                    />
                    <p
                      className="absolute right-3 pr-3 hover:cursor-pointer text-[#0048B4]  max-sm:text-sm"
                      onClick={handleClick}
                    >
                      {show ? "Show" : "Hide"}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 w-full">
                  <p className="text-[#676767]">Your Name</p>
                  <input
                    type="name"
                    name="name"
                    value={loginForm.values.name}
                    onChange={loginForm.handleChange}
                    error={
                      loginForm.touched.name && Boolean(loginForm.errors.name)
                    }
                    placeholder="Enter Your Name"
                    className="rounded-full border border-[#E0E0E0] w-full p-3  max-sm:text-sm"
                  />
                </div>

                <p className="text-red-500 text-sm  text-center">{error}</p>
                <div className="">
                  <button
                    className="text-center bg-blue-400 text-white hover:bg-blue-500 hover:text-white font-semibold p-2  sm:p-4 w-full rounded-full"
                    onClick={(e) => {
                      setErrors();
                      loginForm.handleSubmit();
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>

              <p className="text-sm leading-relaxed mt-4 text-grey-900">
                Already registered?{" "}
                <Link
                  href="/signin"
                  className="font-bold  text-blue-600 hover:text-blue-900"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full  flex items-center justify-center  py-12 sm:py-10">

            <div className="flex border flex-col bg-white rounded-2xl shadow justify-center items-center py-12 w-full sm:w-[500px]">
              <div className="font-bold  tracking-wide justify-center mb-7  text-[30px]  md:text-[40px] lg:text-[48px] xl:text-[48px]">
                Admin Signup
              </div>
              <div className="flex flex-col justify-center gap-7 w-[80%]">
                <div className="space-y-3 w-full">
                  <p className="text-[#676767]">Enter OTP</p>
                  <div className="flex flex-row items-center relative w-full">
                    <input
                      type={`${show ? "password" : "text"}`}
                      value={loginForm.values.otp}
                      onChange={loginForm.handleChange}
                      name="otp"
                      placeholder="Enter OTP"
                      className="rounded-full border border-[#E0E0E0] p-3 w-full  max-sm:text-sm"
                    />
                    <p
                      className="absolute right-3 pr-3 hover:cursor-pointer text-[#0048B4]"
                      onClick={handleClick}
                    >
                      {show ? "Show" : "Hide"}
                    </p>
                  </div>
                 
                </div>

                <div className=" flex gap-4 flex-col">
                  <p className="text-red-500 text-sm  text-center">{error}</p>
                  <button
                    className="text-center bg-blue-400 text-white hover:bg-blue-500 hover:text-white font-semibold p-2 sm:p-4 w-full rounded-full"
                    onClick={(e) => {
                      setErrors();
                      loginForm.handleSubmit();
                    }}
                  >
                    Sign Up
                  </button>
                  <button
                    className="bg-gray-400 text-white p-4 w-full rounded-full"
                    onClick={resendOtp}
                    disabled={!canResend}
                  >
                    {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
                  </button>
                </div>
              </div>

              <p className="text-sm mt-8 leading-relaxed text-grey-900">
                Already registered ?{" "}
                <Link
                  href="/signin"
                  className="font-bold  text-blue-600 hover:text-blue-900"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminSignup;

"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useFormik } from "formik";
// import TokenHelper from "../../helpers/Token.helper";
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
  const [error, setErrors] = useState();
  function handleClick() {
    setShow(!show);
  }
  const navigate = useRouter();

  const router = useRouter();

    const { isAuth } = useGlobalContext();

    if (isAuth) {
      router.push("/");
    }


  const handleOtpForSignUp = (values) => {
    ////TODO:remove this line and comment out next line
    // const handleOtpForSignUp = async (values) => {
    // const response = await authService.sendOtpForSignUpEmployer(values);

    // if (response.status === 201) {
    console.log(values);
    setShowOtpField(true);
    // setShowOtpLoginField(true);
    setCanResend(false);
    setTimer(30);
    // }
  };

  const loginForm = useFormik({
    initialValues: {
      name: formPrefillData ? formPrefillData.name : "",
      email: formPrefillData ? formPrefillData.email : "",
      password: formPrefillData ? formPrefillData.password : "",
      otp: formPrefillData ? formPrefillData.otp : "",
    },

    onSubmit: async (values) => {
      // onSubmit: async (values) => {
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
            role: "admin",
          };
          console.log(0, payload);
          const data = await authService.signUpAdmin(payload);
          console.log(3, data.data.message);

          if (data.data.message === "OTP is already Verified") {
            navigate.push(`/signup/admin/registration/${data.data.id}`);
          } else {
            console.log(222);
            toast.success(data.data.message, {
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
            setTab(1);
          }
          setErrors("");
        } catch (error) {
          setErrors("");
          console.log(1, error.response?.data.message);
          toast.error(error.response?.data.message, {
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
      }

      if (tab === 1) {
        console.log("I AM WORKING");
        try {
          const payload = {
            otp: values.otp,
          };
          payload.email = values.email;
          const data = await authService.verifyOtpForAdmin(payload);
          console.log(22, data);
          navigate.push(`/signup/admin/registration/${data.data.id}`);
        } catch (error) {
          setErrors("");
          console.log(1, error.response?.data.message);
          toast.error(error.response?.data.message, {
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
      }
      // }
    },
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const resendOtp = async (e) => {
    const stringVerify = new RegExp(/[A-Za-z]/);

    const isString = stringVerify.exec(e.target.value);
    const payload = {};
    // if (isString) {
    payload.email = loginForm.values.email;
    // } else {
    //   payload.phone = loginForm.values.email;
    // }
    // const response = await authService.sendOtp(payload);

    // if (response) {
    setShowOtpField(true);
    // setShowOtpLoginField(true);
    setCanResend(false);
    setTimer(30); // Reset the timer
    // }
  };

  return (
    <div className="h-full w-full flex flex-col px-3 ">
      <main>
        {tab === 0 ? (
          <div className="w-full  flex items-center justify-center  py-12 sm:py-3">
            {/* register component */}
            <div className=" flex border flex-col bg-white rounded-2xl shadow justify-center items-center py-12 w-full sm:w-[500px]">
              <div className="font-bold  tracking-wide justify-center mb-7  text-[30px]  md:text-[40px] lg:text-[48px] xl:text-[48px] ">
                Admin Signup
              </div>
              <div className="flex flex-col justify-center gap-7 w-[80%]">
                {/* Email section*/}
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
                    placeholder="Enter Email ID"
                    className="rounded-full border border-[#E0E0E0] w-full p-3 max-sm:text-sm"
                  />
                </div>
                {/* Password Section */}
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
                {/* Full name */}
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

                {/* Forgot password */}
                {/* Register Button */}
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

              {/* already on edzer */}
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
            {/* register component */}
            <div className="flex border flex-col bg-white rounded-2xl shadow justify-center items-center py-12 w-full sm:w-[500px]">
              <div className="font-bold  tracking-wide justify-center mb-7  text-[30px]  md:text-[40px] lg:text-[48px] xl:text-[48px]">
                Admin Signup
              </div>
              <div className="flex flex-col justify-center gap-7 w-[80%]">
                {/* Email section*/}
                <div className="space-y-3 w-full">
                  <p className="text-[#676767]">Enter OTP</p>
                  <div className="flex flex-row items-center relative w-full">
                    <input
                      type={`${show ? "password" : "text"}`}
                      value={loginForm.values.otp}
                      onChange={loginForm.handleChange}
                      name="otp"
                      // value={loginForm.values.password}
                      // onChange={loginForm.handleChange}
                      // error={
                      //     loginForm.touched.password && Boolean(loginForm.errors.password)
                      // }
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
                  <div className="w-full text-right">
                    {canResend ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          resendOtp(e);
                        }}
                        className="text-xs text-blue-600  text-right"
                      >
                        Resend OTP
                      </button>
                    ) : (
                      <p className="text-xs leading-tight text-[#4F4F4F]">
                        {timer} s
                      </p>
                    )}
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
                </div>
              </div>

              {/* already on edzer */}
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

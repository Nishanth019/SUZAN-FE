"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service"; // Import your authService

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [tab, setTab] = useState(0);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authService.sendOtp({ email });
      toast.success("OTP sent successfully");
      setTab(1);
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to send OTP");
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authService.verifyOtp({ email, otp });
      toast.success("OTP verified successfully");
      setTab(2);
    } catch (error) {
      setError(error?.response?.data?.message || "Invalid OTP");
      toast.error(error?.response?.data?.message || "Invalid OTP");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      if (newPassword.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
      const { data } = await authService.updatePassword({ email, newPassword });
      toast.success("Password updated successfully");
      router.push("/signin");
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to update password");
      toast.error(error?.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="md:py-20">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex  items-center justify-center w-full  ">
          <div className="flex   flex-col items-center w-full sm:w-[500px] p-3 py-12 sm:py-3">
            <form
              onSubmit={tab === 0 ? handleSendOtp : tab === 1 ? handleVerifyOtp : handleUpdatePassword}
              className="flex border flex-col shadow-lg w-full h-full pb-6 text-center bg-white rounded-3xl  p-4 md:p-12 "
            >
              <h3 className="mb-3  text-[30px]  md:text-[40px]  font-extrabold text-dark-grey-900">
                Forget Password
              </h3>
              <p className="mb-4 text-grey-700">Enter your email to receive OTP</p>
              {tab === 0 && (
                <>
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
                </>
              )}
              {tab === 1 && (
                <>
                  <label
                    htmlFor="otp"
                    className="mb-2 text-sm text-start text-grey-900 "
                  >
                    Enter OTP*
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="Enter OTP"
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border border-gray-300 p-10"
                    required
                  />
                </>
              )}
              {tab === 2 && (
                <>
                  <label
                    htmlFor="newPassword"
                    className="mb-2 text-sm text-start text-grey-900 "
                  >
                    New Password*
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder="Enter new password"
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border border-gray-300 p-10"
                    required
                  />
                </>
              )}
              <div className=" flex gap-4 flex-col pb-2">
                {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
                <button
                  className="text-center bg-blue-400 text-white hover:bg-blue-500 hover:text-white font-semibold p-2 sm:p-4 w-full rounded-full"
                  type="submit"
                >
                  {tab === 0 ? "Send OTP" : tab === 1 ? "Verify OTP" : "Update Password"}
                </button>
              </div>

              <p className="text-sm leading-relaxed text-grey-900">
                Remembered your password?{" "}
                <Link
                  href="/signin"
                  className="font-bold  text-blue-600 hover:text-blue-900"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

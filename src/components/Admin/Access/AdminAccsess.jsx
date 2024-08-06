"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Input from "../../Generals/Input";
import UserService from "@/services/user.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAccsess = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null); // Changed to null
  const [errorMessage, setErrorMessage] = useState("Search using email"); // For error messages

  const handleSearch = async () => {
    if (searchQuery === "") {
      setUserData(null); // Clear user data when searchQuery is empty
      setErrorMessage("Search using email");
      return;
    }

    try {
      const response = await UserService.getUserByEmail(searchQuery);
      if (response.data.success) {
        const { _id, picture, name, email, roll_no, batch, role } =
          response.data.user;
        setUserData({ id: _id, picture, name, email, roll_no, batch, role });
        setErrorMessage(""); // Clear error message on success
      } else {
        setUserData(null); // Clear user data if user not found
        setErrorMessage("User not found");
      }
    } catch (error) {
      setUserData(null); // Clear user data on error
      if (error.response && error.response.status === 404) {
        setErrorMessage("User not found"); // Specific message for 404 errors
      } else {
        setErrorMessage("Error fetching user by email"); // Generic error message
      }
      console.error("Error fetching user by email:", error);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      setErrorMessage("Search using email");
    }
  }, [searchQuery]);

  const handleRoleToggle = async () => {
    if (!userData) return; // No user data available

    const updatedRole = userData.role === "admin" ? "student" : "admin";
    const isAdmin = userData.role === "admin" ? 0 : 1;
    try {
      await UserService.updateUserRole({ ...userData, role: updatedRole,isAdminVerified: isAdmin});
      setUserData({ ...userData, role: updatedRole }); // Update local state
      setErrorMessage(""); // Clear error message

      toast.success(`Role updated to ${updatedRole}`); // Success toast
    } catch (error) {
      console.error("Error updating user role:", error);
      setErrorMessage("Error updating user role"); // Provide an error message

      toast.error("Error updating user role"); // Error toast
    }
  };

  return (
    <div className="bg-[#F4F7FC] h-full flex-col flex justify-center items-center gap-7 p-6 w-full px-4 md:px-16 lg:px-28 py-16">
      <ToastContainer />
      <div className="flex flex-wrap gap-0 sm:gap-0">
        <div className="w-full md:w-[350px] flex">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FaSearch className="w-4 h-4 text-gray-500" aria-hidden="true" />
            </div>
            <input
              type="search"
              id="default-search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="block w-full py-3 px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-l-lg bg-gray-50"
              placeholder="Search by Email"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      <div className="text-red-500 text-lg font-semibold">{errorMessage}</div>

      {userData && (
        <div className="w-full max-sm:w-screen bg-white rounded-2xl lg:px-16 md:px-10 px-4 py-12 flex flex-col gap-y-7 max-sm:h-full drop-shadow">
          <div className="w-full h-full flex justify-between space-x-3 ">
            <div>
              <div className="rounded-full overflow-hidden">
                {userData.picture ? (
                  <img
                    className="h-12 w-12 lg:h-16 lg:w-16 object-cover object-center rounded-full"
                    src={userData.picture}
                    alt={userData.name}
                  />
                ) : (
                  <div className="inline-flex items-center justify-center w-[38px] h-[38px] lg:w-[45px] lg:h-[45px] bg-gray-400 rounded-full">
                    <span className="font-medium text-white text-xl">
                      {userData.name ? userData.name[0] : "E"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <button
                onClick={handleRoleToggle}
                className={`text-center text-sm md:text-[16px] px-4 py-2 md:px-8 md:py-3 border text-white ${
                  userData.role === "admin"
                    ? "bg-red-400 hover:bg-red-500"
                    : "bg-blue-400 hover:bg-blue-500"
                } font-bold rounded-xl cursor-pointer`}
              >
                {userData.role === "admin"
                  ? "Remove Admin Access"
                  : "Give Admin Access"}
              </button>
            </div>
          </div>

          <div className="flex md:flex-row flex-col items-center gap-4 md:gap-8 w-full">
            <Input
              name="name"
              handleChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              value={userData.name}
              label="Your name"
              disabled={true}
            />
            <Input
              name="email"
              value={userData.email}
              label="Email ID"
              disabled={true}
            />
          </div>

          <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
            <Input
              name="roll_no"
              handleChange={(e) =>
                setUserData({ ...userData, roll_no: e.target.value })
              }
              value={userData.roll_no}
              label="Roll Number"
              disabled={true}
            />

            <Input
              name="batch"
              handleChange={(e) =>
                setUserData({ ...userData, batch: e.target.value })
              }
              value={userData.batch}
              label="Batch"
              disabled={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccsess;

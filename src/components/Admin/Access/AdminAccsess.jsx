"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Input from "../../Generals/Input";
import UserService from "@/services/user.service";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import toast, { Toaster } from "react-hot-toast";

const AdminAccsess = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [adminList, setAdminList] = useState([]); // Store list of admins

  useEffect(() => {
    fetchAdminList(); // Fetch the list of admins when component mounts
  }, []);

  const fetchAdminList = async () => {
    try {
      console.log(3);
      const response = await UserService.getAllAdmins();
      console.log(0,response);
        setAdminList(response.data.admins);
    } catch (error) {
      console.error("Error fetching admin list:", error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery === "") {
      setUserData(null);
      setErrorMessage("");
      return;
    }

    try {
      const response = await UserService.getUserByEmail(searchQuery);
      if (response.data.success) {
        const { _id, picture, name, email, roll_no, batch, role } =
          response.data.user;
        setUserData({ id: _id, picture, name, email, roll_no, batch, role });
        setErrorMessage("");
      } else {
        setUserData(null);
        setErrorMessage("User not found");
      }
    } catch (error) {
      setUserData(null);
      if (error.response && error.response.status === 404) {
        setErrorMessage("User not found");
      } else {
        setErrorMessage("Error fetching user by email");
      }
      console.error("Error fetching user by email:", error);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      setErrorMessage("");
    }
  }, [searchQuery]);

  const handleRoleToggle = async (userId, currentRole) => {
    const updatedRole = currentRole === "admin" ? "student" : "admin";
    const isAdmin = currentRole === "admin" ? false : true;
  
    try {
      await UserService.updateUserRole({ id: userId, role: updatedRole, isAdminVerified:isAdmin});
      console.log(1);
      // Refresh the admin list after updating role
      await fetchAdminList();
      console.log(11);
      setErrorMessage("");
      // toast.success();
      toast.success(`Role updated to ${updatedRole}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setUserData("");  // Clear user data if needed
    } catch (error) {
      console.error("Error updating user role:", error);
      setErrorMessage("Error updating user role");
      // toast.error(");
      toast.error("Error updating user role", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };
  

  return (
    <div>
      <p className="font-bold text-lg sm:text-2xl lg:text-3xl">
        Add or Remove Admin
      </p>
      <div className="h-full flex-col flex justify-center items-center gap-7 w-full px-4 md:px-16 lg:px-28 py-2">
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
            <div className="w-full h-full flex justify-between space-x-3">
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
              <div>
                <button
                  onClick={() => handleRoleToggle(userData.id, userData.role)}
                  className={`text-center text-sm md:text-[16px] px-4 py-2 md:px-8 md:py-3 border text-white ${
                    userData.role === "admin"
                      ? "bg-red-400 hover:bg-red-500"
                      : "bg-blue-400 hover:bg-blue-500"
                  } font-bold rounded-xl cursor-pointer`}
                >
                  {userData.role === "admin" ? "Remove Admin Access" : "Give Admin Access"}
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
        {/* Display list of admins */}
        <div className="mt-8 w-full">
          <h3 className="font-bold text-lg sm:text-2xl lg:text-3xl mb-4">Admin List</h3>
          <div className="flex flex-col gap-10">
            {adminList?.map((admin) => (
              <div
                key={admin._id}
                className="flex max-sm:flex-col items-center justify-between bg-white rounded-lg p-4 shadow-md max-sm:gap-2"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full overflow-hidden max-sm:hidden">
                  {admin?.picture ? (
                      <img
                        className="h-9 w-9 lg:h-10 lg:w-10 object-cover object-center "
                        src={admin?.picture}
                        alt={admin?.name}
                      />
                    ) : (
                      <div class="inline-flex items-center justify-center  w-[38px] h-[38px] lg:w-[45px] lg:h-[45px]  bg-gray-400 rounded-full">
                        <span class="font-medium text-white text-xl ">
                          {" "}
                          {admin?.name ? admin?.name[0] : `E`}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{admin.name}</p>
                    <p className="text-gray-500 text-sm">{admin.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRoleToggle(admin._id, admin.role)}
                  className={`px-4 py-2 text-sm text-white font-bold rounded-lg ${
                    admin.role === "admin"
                      ? "bg-red-400 hover:bg-red-500"
                      : "bg-blue-400 hover:bg-blue-500"
                  }`}
                >
                  {admin.role === "admin" ? "Remove Admin" : "Make Admin"}
                </button>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default AdminAccsess;

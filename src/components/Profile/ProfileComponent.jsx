"use client";
import React, { useEffect, useState } from "react";
import Input from "../Generals/Input";
import { useRouter } from "next/navigation";
import UserService from "@/services/user.service";
import collegeService from "@/services/college.service";
import { Modal,Box, Typography, Button, Text } from "@mui/material"; 
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

function ProfileComponent() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.push("/profile");
    }
  }, []);
  

  const [currentUser, setCurrentUser] = useState(null);
  const [collegeDetails, setCollegeDetails] = useState(null);
  const [isEdit, setIsEdit] = useState(true);
  const [isEditCollegeDetails, setIsEditCollegeDetails] = useState(true);
  const [picture, setPicture] = useState(null);
  const [logo, setLogo] = useState(null);

  // Define states for form values
  const [userData, setUserData] = useState({
    id: "",
    picture: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    roll_no: "",
    program: "",
    branch: "",
    batch: "",
    role: "",
  });

  const [collegeData, setCollegeData] = useState({
    id: "",
    college_name: "",
    street_name: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    email_domain: "",
    college_logo:"",
  });

    // State management for "Switch Main Admin Access" functionality
    const [isSwitchAdminModalOpen, setIsSwitchAdminModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedUser, setSearchedUser] = useState(null);
    const [searchErrorMessage, setSearchErrorMessage] = useState("");
    const [adminList, setAdminList] = useState([]); // Store list of admins
  

  const handleChangePicture = async (e) => {
    const file = e.target.files[0];
    console.log(23,file);
    try {
      const formData = new FormData();
      formData.append("picture", file);
      // formData.append("userData", JSON.stringify(userData)); // Append other user data
      console.log(23333,formData);
      const response = await UserService.uploadPicture(formData);
      setPicture(response?.data?.user?.picture);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error message
    }
  };
  const handleChangeLogo= async (e) => {
    const file = e.target.files[0];
    console.log(2444,file);
    try {
      const formData = new FormData();
      formData.append("picture", file);
      // formData.append("userData", JSON.stringify(userData)); // Append other user data
      console.log(23333,formData);
      const response = await collegeService.updateLogo(collegeData.id,formData);
      setLogo(response?.data?.college?.college_logo);
      console.log(24,response.data);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating college logo:", error);
      // Handle error message
    }
  };

  const handleChangeGender = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await UserService.getCurrentUser();
        setCurrentUser(userData.data.user);
        const clg_id = userData.data.user.college;
        const clg_data = await collegeService.getCollegeById(clg_id);
        setCollegeDetails(clg_data.data.college);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [picture,logo]);

  useEffect(() => {
    if (currentUser) {
      const { role } = currentUser;
      setUserData({
        id: currentUser._id,
        picture: currentUser.picture,
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        gender: currentUser.gender,
        roll_no: currentUser.roll_no,
        program: currentUser.program,
        branch: currentUser.branch,
        batch: currentUser.batch,
        role: currentUser.role,
      });

      if ((role === "admin"|| role === "mainadmin")  && collegeDetails) {
        setCollegeData({
          id: collegeDetails._id,
          college_name: collegeDetails.college_name,
          street_name: collegeDetails.street_name,
          city: collegeDetails.city,
          state: collegeDetails.state,
          pincode: collegeDetails.pincode,
          country: collegeDetails.country,
          email_domain: collegeDetails.email_domain,
          college_logo: collegeDetails.college_logo,
        });
      } else if (role === "student" && collegeDetails) {
        setCollegeData({
          id: collegeDetails._id,
          college_name: collegeDetails.college_name,
        });
      }
    }
  }, [currentUser, collegeDetails]);


  const updateUser = async () => {
    try {
      const response = await UserService.updateUser(userData);
      // Handle success message or redirect if needed
      console.log(33, response);
      toast.success(response.data.message, {
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
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error message
    }
  };

  const updateCollege = async () => {
    try {
      const response = await collegeService.updateCollegeById(collegeData.id, collegeData);
      // Handle success message or redirect if needed
      console.log(35, response);
      toast.success(response.data.message, {
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
    } catch (error) {
      console.error("Error updating college details:", error);
      // Handle error message
    }
  };

  const handleOpenSwitchAdminModal = () => {
    setIsSwitchAdminModalOpen(true);
    setSearchErrorMessage("");
    setSearchedUser(null); // Clear previous search results
  };

  const handleCloseSwitchAdminModal = () => {
    setIsSwitchAdminModalOpen(false);
    setSearchErrorMessage("");
    setSearchedUser(null); // Clear previous search results
  };

  const handleSearchUser = async () => {
    if (searchQuery === "") {
      setSearchedUser(null);
      setSearchErrorMessage("");
      return;
    }
  
    try {
      const response = await UserService.getUserByEmail(searchQuery);
      if (response.data.success) {
        const { _id, picture, name, email, roll_no, batch, role } = response.data.user;
        setSearchedUser({ id: _id, picture, name, email, roll_no, batch, role });
        setSearchErrorMessage("");
      } else {
        setSearchedUser(null);
        setSearchErrorMessage("User not found");
      }
    } catch (error) {
      setSearchedUser(null);
      if (error.response && error.response.status === 404) {
        setSearchErrorMessage("User not found");
      } else {
        setSearchErrorMessage("Error fetching user by email");
      }
      console.error("Error fetching user by email:", error);
    }
  };

  const handleSwitchMainAdmin = async () => {
    if (!searchedUser) {
      return; // Prevent action if no user is selected
    }

    try {
      const response = await UserService.switchMainAdmin({ currentAdminId: currentUser._id, newAdminId: searchedUser.id });
      console.log(23,response);
      toast.success("Main admin access switched successfully.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 

        theme: "colored", 

      });
      // Update current user's role to 'admin'
      setCurrentUser({ ...currentUser, role: 'admin' });
      setIsSwitchAdminModalOpen(false);
      setSearchErrorMessage("");
      setSearchedUser(null);
    } catch (error) {
      console.error("Error switching main admin access:", error);
      toast.error("Error switching main admin access.", {
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
    <div className="bg-[#F4F7FC] h-full flex-col flex justify-center items-center gap-7 p-6 w-full px-4 md:px-16 lg:px-28 py-16">
      <div className="flex justify-end w-full">
        <div className="px-6 ">
          {isEdit ? (
            <button
              onClick={() => setIsEdit(false)}
              className="text-center border border-[#36518F] text-[#36518F] font-bold rounded-full text-sm md:text-[16px] px-4 py-2 md:px-8 md:py-3 whitespace-nowrap"
            >
              Edit User
            </button>
          ) : (
            <button
              onClick={() => {
                setIsEdit(true);
                updateUser();
              }}
              className="text-center border border-[#36518F] 
               bg-blue-400 hover:bg-blue-500 text-[#36518F] 
               font-bold rounded-full w-full text-sm md:text-[16px] px-4 py-2 md:px-8 md:py-3 whitespace-nowrap"
            >
              Save User Details
            </button>
          )}
        </div>

        <div>
          {isEditCollegeDetails &&
          (userData.role === "admin" || userData.role === "mainadmin") ? (
            <button
              onClick={() => setIsEditCollegeDetails(false)}
              className="text-center border border-[#36518F] text-[#36518F]  font-bold rounded-full text-sm md:text-[16px] px-4 py-2 md:px-8 md:py-3 whitespace-nowrap"
            >
              Edit College
            </button>
          ) : (
            (userData.role === "admin" || userData.role === "mainadmin") && (
              <button
                onClick={() => {
                  setIsEditCollegeDetails(true);
                  updateCollege();
                }}
                className="text-center border border-[#36518F] 
               bg-blue-400 hover:bg-blue-500 text-[#36518F] 
              font-bold rounded-full text-sm md:text-[16px] px-4 py-2 md:px-8 md:py-3 whitespace-nowrap"
              >
                Save College
              </button>
            )
          )}
        </div>
      </div>
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
            {isEdit && (
              <>
                <label
                  htmlFor="userPictureInput"
                  className="text-blue-400 cursor-pointer text-sm"
                >
                  Update Picture
                </label>
                <input
                  id="userPictureInput"
                  type="file"
                  accept="image/*"
                  onChange={handleChangePicture}
                  className="hidden"
                />{" "}
              </>
            )}
          </div>
          <div>
            <div className="overflow-hidden">
              {collegeData.college_logo ? (
                <img
                  className="h-12 w-20 lg:h-16 lg:w-28 object-cover object-center "
                  src={collegeData.college_logo}
                  alt={collegeData.college_name}
                />
              ) : (
                <div className="inline-flex items-center justify-center w-[38px] h-[38px] lg:w-[45px] lg:h-[45px] bg-gray-400 rounded-full">
                  <span className="font-medium text-white text-xl">
                    {collegeData.college_name ? collegeData.college_name : "E"}
                  </span>
                </div>
              )}
            </div>
            {isEdit && (
              <>
                <label
                  htmlFor="collegeLogoInput"
                  className="text-blue-400 cursor-pointer text-sm"
                >
                  Update College Logo
                </label>
                <input
                  id="collegeLogoInput"
                  type="file"
                  accept="image/*"
                  onChange={handleChangeLogo}
                  className="hidden"
                />{" "}
              </>
            )}
          </div>
          <div className="">
            {userData.role === "admin" || userData.role == "mainadmin" ? (
              <div className="text-center text-sm md:text-[16px] px-4 py-2 md:px-8 md:py-3 border  text-white bg-blue-400 hover:bg-blue-500  font-bold rounded-xl  cursor-pointer">
                <Link href="/admin-dashboard">Admin</Link>
              </div>
            ) : (
              <div></div>
            )}
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
            disabled={isEdit}
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
            name="phone"
            handleChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
            value={userData.phone}
            label="Phone Number"
            disabled={isEdit}
          />

          <Input
            name="college_name"
            value={collegeData.college_name}
            label="College Name"
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
            disabled={isEdit}
          />

          <Input
            name="batch"
            handleChange={(e) =>
              setUserData({ ...userData, batch: e.target.value })
            }
            value={userData.batch}
            label="Batch"
            disabled={isEdit}
          />
        </div>

        <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
          <Input
            name="program"
            handleChange={(e) =>
              setUserData({ ...userData, program: e.target.value })
            }
            value={userData.program}
            label="Program"
            disabled={isEdit}
          />

          <Input
            name="branch"
            handleChange={(e) =>
              setUserData({ ...userData, branch: e.target.value })
            }
            value={userData.branch}
            label="Branch"
            disabled={isEdit}
          />
        </div>

        <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
          <Input
            name="role"
            value={userData.role}
            label="Role"
            disabled={true}
          />
          {isEdit ? (
            <Input
              name="gender"
              handleChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
              value={userData.gender}
              label="Gender"
              disabled={isEdit}
            />
          ) : (
            <div className="w-full md:flex-1">
              <label>Gender:</label>
              <select
                name="gender"
                className="border-2 border-gray-300 w-full py-2 px-4 rounded-lg"
                value={userData.gender}
                onChange={handleChangeGender}
              >
                <option key="male" value="male">
                  Male
                </option>
                <option key="female" value="female">
                  Female
                </option>
                <option key="others" value="others">
                  Others
                </option>
              </select>
            </div>
          )}
        </div>

        {(userData.role === "admin" || userData.role == "mainadmin") && (
          <div>
            <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
              <Input
                name="street_name"
                value={collegeData.street_name}
                label="Street Name"
                handleChange={(e) =>
                  setCollegeData({
                    ...collegeData,
                    street_name: e.target.value,
                  })
                }
                disabled={isEditCollegeDetails}
              />

              <Input
                name="city"
                value={collegeData.city}
                label="City"
                handleChange={(e) =>
                  setCollegeData({ ...collegeData, city: e.target.value })
                }
                disabled={isEditCollegeDetails}
              />
            </div>
            <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
              <Input
                name="state"
                value={collegeData.state}
                label="State"
                handleChange={(e) =>
                  setCollegeData({ ...collegeData, state: e.target.value })
                }
                disabled={isEditCollegeDetails}
              />

              <Input
                name="pincode"
                value={collegeData.pincode}
                label="Pincode"
                handleChange={(e) =>
                  setCollegeData({ ...collegeData, pincode: e.target.value })
                }
                disabled={isEditCollegeDetails}
              />
            </div>
            <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
              <Input
                name="country"
                value={collegeData.country}
                label="Country"
                handleChange={(e) =>
                  setCollegeData({ ...collegeData, country: e.target.value })
                }
                disabled={true}
              />

              <Input
                name="email_domain"
                value={collegeData.email_domain}
                label="Email Domain"
                handleChange={(e) =>
                  setCollegeData({
                    ...collegeData,
                    email_domain: e.target.value,
                  })
                }
                disabled={true}
              />
            </div>
          </div>
        )}
      </div>

      {userData.role === "mainadmin" && (
        <button
          onClick={handleOpenSwitchAdminModal}
          className="text-center border border-[#36518F] text-[#36518F] font-bold rounded-full text-sm md:text-[16px] px-4 py-2 md:px-8 md:py-3 whitespace-nowrap"
        >
          Switch Main Admin Access
        </button>
      )}
      <Modal
        open={isSwitchAdminModalOpen}
        onClose={handleCloseSwitchAdminModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] bg-white shadow-lg p-[25px]">
          <p className="font-bold text-md sm:text-xl lg:text-2xl pb-5">
            Switch Main Admin Access
          </p>
          <div>
            <p className="text-sm sm:text-lg lg:text-xl">Search by Email:</p>
            <Input
              placeholder="Search by Email"
              value={searchQuery}
              handleChange={(e) => {
                e.preventDefault();
                setSearchQuery(e.target.value);
              }}
            />
            <div
              className="text-center text-sm md:text-[16px] px-4 py-2 md:px-8 md:py-3 border  text-white bg-blue-400 hover:bg-blue-500  font-bold rounded-xl  cursor-pointer mt-2"
              onClick={handleSearchUser}
            >
              Search
            </div>
          </div>
          {searchErrorMessage && (
            <p className="text-md mt-3 flex justify-center items-center ">
              {searchErrorMessage}
            </p>
          )}
          {searchedUser !== null && (
            <div>
              <div className="w-full  bg-white rounded-2xl flex flex-col gap-y-7 drop-shadow my-3 p-2">
                <div className="flex items-center  gap-4 ">
                  <div className="rounded-full overflow-hidden">
                    {searchedUser.picture ? (
                      <img
                        className="h-12 w-12 lg:h-16 lg:w-16 object-cover object-center"
                        src={searchedUser.picture}
                        alt={searchedUser.name}
                      />
                    ) : (
                      <div className="inline-flex items-center justify-center w-[38px] h-[38px] lg:w-[45px] lg:h-[45px] bg-gray-400 rounded-full">
                        <span className="font-medium text-white text-xl">
                          {searchedUser.name ? searchedUser.name[0] : "E"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{searchedUser.name}</p>
                    <p className="text-gray-500 text-sm">
                      {searchedUser.email}
                    </p>
                  </div>
                </div>
                <div
                  className="text-center text-sm md:text-[16px] px-4 py-2 md:px-8 md:py-3 border  text-white bg-blue-400 hover:bg-blue-500  font-bold rounded-xl  cursor-pointer mt-2"
                  onClick={handleSwitchMainAdmin}
                >
                  Switch Main Admin Access
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ProfileComponent;


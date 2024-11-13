"use client";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import userService from "@/services/user.service";
import RegistrationAbout from "./RegistrationAbout";
import RegistrationBasic from "./RegistrationBasic";
import authService from "@/services/auth.service";
import { useGlobalContext } from "@/context/AuthContext";
import toast from "react-hot-toast";

const AdminRegistration = () => {
  const router = useRouter();
  const pathname = usePathname();
  const email_id = pathname.split("/").pop();
  
  const { isAuth } = useGlobalContext();

  // Redirect if the user is already authenticated
  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  const [user, setUser] = useState(null);
  const [stage, setStage] = useState(1);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    college_name: "",
    street_name: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    roll_no: "",
    program: "",
    branch: "",
    batch: "",
    email_domain: "",
    college_logo:"",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await userService.getUserById(email_id);
        if (data && data.user) {
          const { name, email } = data.user;
          setDetails((prevDetails) => ({
            ...prevDetails,
            name,
            email,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [email_id]);

  const handleCheckboxChange = (isChecked) => {
    setIsCheckboxChecked(isChecked);
  };

  const handleStageClick = () => {
    setStage((prevStage) => (prevStage === 1 ? 2 : 1));
  };

  const validateDetails = (details) => {
    const errors = {};

    // Email validation
    if (!details.email) {
      errors.email = "Email Required!";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(details.email)) {
        errors.email = "Invalid Email";
      }
    }

    // Phone number validation
    if (!details.phone || !/^\d{10}$/.test(details.phone)) {
      errors.phone = "Invalid phone number. Must be 10 digits.";
    }

    // Pincode validation
    if (!details.pincode || !/^\d{6}$/.test(details.pincode)) {
      errors.pincode = "Invalid pincode. Must be 6 digits.";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateDetails(details);
    if (Object.keys(errors).length > 0) {
      // Display validation errors using toast
      for (const key in errors) {
        toast.error(errors[key], {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
      return;
    }

    try {
      const response = await authService.completeAdminSignup(details);
      toast.success(response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.error("Error completing sign-up:", error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 md:gap-4 px-4 md:px-16 lg:px-28 py-5 sm:py-8">
      {/* Title Section */}
      <h1 className="text-2xl font-semibold text-center text-[30px] md:text-[40px] lg:text-[48px] xl:text-[48px]">
        Greetings From <span className="primary-text-color">SUZAN</span>
      </h1>
      <h4 className="font-medium text-center sm:text-lg">
        You are just a few clicks away from making your college life easier!
      </h4>

      {/* Registration Form Section */}
      <div className="rounded-xl drop-shadow border md:bg-white p-4 md:p-8 mt-2 md:mt-6 w-full">
        {stage === 1 ? (
          <RegistrationBasic details={details} setDetails={setDetails} />
        ) : (
          <RegistrationAbout
            details={details}
            setDetails={setDetails}
            onCheckboxChange={handleCheckboxChange}
          />
        )}

        {/* Navigation Buttons */}
        <div className="w-full flex items-center justify-center gap-4">
          {stage === 1 ? (
            <button
              onClick={handleStageClick}
              type="submit"
              className="px-6 py-2 text-lg rounded-full text-white mt-6 font-medium bg-[#36518F]"
            >
              Next
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  handleStageClick();
                  setIsCheckboxChecked(false);
                }}
                className="px-4 py-2 sm:px-6 sm:py-3 text-lg text-paleBlue rounded-full mt-6 border-paleBlue border-2 font-medium capitalize flex items-center justify-center gap-2 hover:bg-[#36518F] hover:text-white"
              >
                <BsArrowLeft size={20} />
                Previous
              </button>
              <button
                disabled={!isCheckboxChecked}
                type="submit"
                onClick={handleSubmit}
                className={`px-6 py-2 sm:px-6 sm:py-3 text-lg rounded-full text-white mt-6 font-medium ${
                  !isCheckboxChecked
                    ? "bg-gray-400"
                    : "bg-[#36518F] hover:bg-blue-700"
                }`}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRegistration;
  
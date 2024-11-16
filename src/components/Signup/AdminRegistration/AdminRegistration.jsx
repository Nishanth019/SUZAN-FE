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

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

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
    email_domain: "",
    college_logo: "",
  });

  const [errors, setErrors] = useState({});

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

  const validateFields = () => {
    const newErrors = {};
    if (!details.name) newErrors.name = "Name is required";
    if (!details.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(details.phone)) {
      newErrors.phone = "Enter valid phone number";
    }
    if (!details.gender) newErrors.gender = "Gender is required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateFields()) {
      setStage(2);
    }
  };

  const validateAboutFields = () => {
    const newErrors = {};
  
    // Check each required field and set error messages
    if (!details.college_name) {
      newErrors.college_name = "College Name is required";
    }
    if (!details.email_domain) {
      newErrors.email_domain = "College Email domain is required";
    } else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(details.email_domain)) {
      newErrors.email_domain = "Please enter a valid email domain";
    }
    if (!details.street_name) {
      newErrors.street_name = "Street Name is required";
    }
    if (!details.city) {
      newErrors.city = "City is required";
    }
    if (!details.state) {
      newErrors.state = "State is required";
    }
    if (!details.country) {
      newErrors.country = "Country is required";
    }
    if (!details.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(details.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }
    if (!details.college_logo) {
      newErrors.college_logo = "College Logo is required";
    }
  
    setErrors(newErrors);
    console.log("Validation Errors:", newErrors); // Log errors to see the validation issues
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      console.log(345)
      console.log(validateAboutFields())
      if (validateAboutFields()) {
         console.log(1234)
      const response = await authService.completeAdminSignup(details);
      toast.success(response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.push("/");
    }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
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
    <div className="w-full flex flex-col justify-center items-center gap-2 md:gap-4 px-4 md:px-16 lg:px-28 py-5 sm:py-8">
      <h1 className="text-2xl font-semibold text-center text-[30px] md:text-[40px] lg:text-[48px] xl:text-[48px]">
        Greetings From <span className="primary-text-color">SUZAN</span>
      </h1>
      <h4 className="font-medium text-center sm:text-lg">
        You are just a few clicks away from making your college life easier!
      </h4>

      <div className="rounded-xl drop-shadow border md:bg-white p-4 md:p-8 mt-2 md:mt-6 w-full">
        {stage === 1 ? (
          <RegistrationBasic
            details={details}
            setDetails={setDetails}
            errors={errors}
          />
        ) : (
          <RegistrationAbout details={details} setDetails={setDetails} onCheckboxChange={setIsCheckboxChecked} errors={errors}/>
        )}

        <div className="w-full flex items-center justify-center gap-4">
          {stage === 1 ? (
            <button
              onClick={handleNext}
              type="submit"
              className="px-6 py-2 text-lg rounded-full text-white mt-6 font-medium bg-[#36518F]"
            >
              Next
            </button>
          ) : (
            <>
              <button
                onClick={() => setStage(1)}
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

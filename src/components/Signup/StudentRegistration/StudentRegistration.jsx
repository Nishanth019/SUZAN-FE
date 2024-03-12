"use client";
import { useEffect } from "react";
import basicRegistrationValidations from "@/validations/registration/registration.validations";
import aboutRegistrationValidation from "@/validations/registration/registration.validations";
import RegistrationAbout from "./RegistrationAbout";
import RegistrationBasic from "./RegistrationBasic";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter,usePathname } from "next/navigation";
import userService from "@/services/user.service";
import authService from "@/services/auth.service";
import { useGlobalContext } from "@/context/AuthContext";

const StudentRegistration = () => {
  const router = useRouter();
    const { isAuth, user, setUser, setIsAuth } = useGlobalContext();

    if (isAuth) {
      router.push("/");
    }
  const pathname = usePathname();
  const email_id = pathname.split("/").pop();

  const [stage, setStage] = useState(1);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // State to track checkbox status

  const handleCheckboxChange = (isChecked) => {
    setIsCheckboxChecked(isChecked);
  };

  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    college_name: "",
    roll_no: "",
    program: "",
    branch: "",
    batch: "",
  });
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await userService.getUserById(email_id);
        console.log(1, data);
        if (data && data.user) {
          const { name, email } = data.user;
          console.log(name, email);
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
    getUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the completeSignUp API
      const data = { ...details };
      const response = await authService.completeStudentSignup(data); // Replace `data` with the required payload for the API
            console.log(1, response);
     // Set authentication state to true and set user information after successful login
            setIsAuth(true);
            setUser(response.data.user);
            console.log(isAuth, user);
            router.push("/");

      // Handle response
      console.log("Student is registered ", response);
    } catch (error) {
      // Handle error
      console.error("Error completing sign-up:", error);
    }
  };

  // console.log(details);

  // console.log(social);
  const handleStageClick = () => {
    setStage((stage) => (stage === 1 ? 2 : 1));
  };

  //   const getUser = TokenHelper.get();
  //   useEffect(() => {
  //     const apiData = async () => {
  //       const data = await userService.getCurrentUser();
  //       if (data.data.result !== null) {
  //         // console.log(user);
  //         basicForm.setValues({
  //           ...basicForm.values,
  //           name: data?.data?.result?.name || "",
  //           email: data?.data?.result?.email || "",
  //           phone: data?.data?.result?.phone || "",
  //         });
  //         setUser(data?.data?.result);
  //       }
  //     };
  //     apiData();
  //   }, [getUser]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 md:gap-4 px-4 md:px-16 lg:px-28 py-5 sm:py-8 ">
      <h1 className="text-2xl font-semibold text-center   text-[30px]  md:text-[40px] lg:text-[48px] xl:text-[48px] ">
        Greetings From <span className="primary-text-color">SUZAN</span>
      </h1>
      <h4 className="font-medium text-center sm:text-lg">
        You are just few clicks away from making your college life easier!
      </h4>

      <div className="rounded-xl drop-shadow border md:bg-white p-4 md:p-8 mt-2 md:mt-6 w-full">
        {/* Registration div */}
        <div>
          {stage === 1 ? (
            <RegistrationBasic details={details} setDetails={setDetails} />
          ) : (
            <RegistrationAbout
              setDetails={setDetails}
              details={details}
              onCheckboxChange={handleCheckboxChange}
            />
          )}
        </div>
        {/* Navigation buttons */}
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
                onClick={handleStageClick}
                className="px-4 py-2 sm:px-6 sm:py-3  text-lg text-paleBlue rounded-full mt-6 border-paleBlue border-2 font-medium capitalize flex items-center justify-center gap-2 hover:bg-[#36518F] hover:text-white"
              >
                <BsArrowLeft size={20} />
                previous
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

export default StudentRegistration;

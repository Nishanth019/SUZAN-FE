"use client";
import { useEffect } from "react";
import  basicRegistrationValidations from "@/validations/registration/registration.validations";
import  aboutRegistrationValidation  from "@/validations/registration/registration.validations";
import RegistrationAbout from "./RegistrationAbout";
import RegistrationBasic from "./RegistrationBasic";
// import employerService from "@/services/employer.service";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
// import TokenHelper from "@/helpers/Token.helper";
// import authService from "@/services/auth.service";
// import userService from "@/services/user.service";
import { useFormik } from "formik";

const AdminRegistration = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stage, setStage] = useState(1);

  const [details, setDetails] = useState({
      name: "",
      email: "",
      phone: "",
      gender: "",
       collegeName:"",
      streetName:"",
      city:"",
      state:"",
      pincode:"",
      country:"India",
        rollNo:"",
      program:"",
      branch:"",
      batch:"",
    documents: [],
  });
  const basicForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",

    },
    validationSchema: basicRegistrationValidations,
    onSubmit: async () => {
      setStage((stage) => (stage === 1 ? 2 : 1));
      console.log(0,stage);
    },
  });
  const aboutForm = useFormik({
    initialValues: {
    //   about: "",
    //   companyName: "",
    //   companyLogo: "",
      documents: [],
       collegeName:"",
      streetName:"",
      city:"",
      state:"",
      pincode:"",
      country:"India",
        rollNo:"",
      program:"",
      branch:"",
      batch:"",
    },
    validationSchema: aboutRegistrationValidation,
    onSubmit: async (values) => {
      try {
       
        const { data } = await userService.updateCurrentUser(values);
        if (data.error === false) {
          console.log("Onboarding completed");
          router.push("/");
        }
        console.log(data.message);
      } catch (error) {
        console.error("Error in onboarding:", error);
      }
    },
  });
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

  useEffect(() => {
    setDetails({
      ...details,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    });
  }, [user]);

  const handleSubmit = async () => {
    try {
      const combinedData = { ...details, socialProfiles: [...social] };
      console.log(combinedData);
      const { data } = await userService.updateCurrentUser(combinedData);
      if (data.error === false) {
        console.log("Onboarding completed");
        router.push("/");
      }
      console.log(data.message);
    } catch (error) {
      console.error("Error in onboarding:", error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 md:gap-4 px-4 md:px-16 lg:px-28 py-5 sm:py-8 ">
      <h1 className="text-2xl font-semibold text-center   text-[30px]  md:text-[40px] lg:text-[48px] xl:text-[48px] ">
        Greetings From <span className="primary-text-color">SUZAN</span>
      </h1>
      <h4 className="font-medium text-center sm:text-lg">You are just few clicks away from making your college life easier!</h4>
      <div className="rounded-xl drop-shadow border md:bg-white p-4 md:p-8 mt-2 md:mt-6 w-full">
        {stage === 1 ? (
          <RegistrationBasic
            formikForm={basicForm}
            details={details}
            setDetails={setDetails}
          />
        ) : (
          <RegistrationAbout
            setDetails={setDetails}
            formikForm={aboutForm}
            details={details}
         
           
          />
        )}
      </div>
      <div className="w-full flex items-center justify-center gap-4">
        {stage === 1 ? (
          <button
            onClick={basicForm.handleSubmit}
            
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
              onClick={aboutForm.handleSubmit}
              className="px-6 py-2 sm:px-6 sm:py-3  text-lg bg-[#36518F] rounded-full text-white mt-6 font-medium"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminRegistration;

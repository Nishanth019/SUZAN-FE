"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Input from "../Generals/Input";
import { useFormik } from "formik";
import {adminValidationSchema, studentValidationSchema } from "@/validations/Profile/profile.validations";
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Upload } from "../Utils/UploadModal/Upload";
import UserService from "@/services/user.service";
import collegeService from "@/services/college.service";

const admindummydata = {
  id: "1",
  picture:
    "https://images.herzindagi.info/image/2020/Feb/sunny-leone-shares-beauty-secrets-m.jpg",
  name: "satwik",
  email: "karthi@brihat.com",
  phone: "9876543210",
  gender: "Male",
  roll_no: "21bcs054",
  program: "B.Tech",
  branch: "CSE",
  batch: "2025",
  role: "admin",
};
const studentdummydata = {
  id: "1",
  picture: "",
  name: "Karthikeyan",
  email: "karthi@brihat.com",
  phone: "9876543210",
  gender: "Male",
  roll_no: "21bcs054",
  program: "B.Tech",
  branch: "CSE",
  batch: "2025",
  role: "student",
};
const collegedummydata = {
  id: "1",
  collegename: "Brihat University",
  streetname: "1st Main Road",
  city: "Chennai",
  state: "Tamil Nadu",
  pincode: "600078",
  country: "India",
  emaildomain: "brihat.com",
};

function ProfileComponent() {
  const router = useRouter();

  useEffect(() => {
    if(window !== undefined){
      router.push('/profile')
    }
}, []);

  const [currentUser, setCurrentUser] = useState(null);
  const [collegeDetails, setCollegeDetails] = useState(null);

  const [isEdit, setIsEdit] = useState(true);
  const [isEditCollegeDetails, setIsEditCollegeDetails] = useState(true);

  const form = useFormik({
    initialValues: {
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
    },

    validationSchema:
      currentUser?.role === "admin"
        ? adminValidationSchema
        : studentValidationSchema,

    onSubmit: async (values) => {
      setIsEdit(true);
      console.log("now");
      console.log(values);
      if (currentUser?.role === "admin") {
        console.log("currentUser sent to admin backend");
        admindummydata.name = values.name;
        admindummydata.email = values.email;
        admindummydata.phone = values.phone;
        admindummydata.gender = values.gender;
        admindummydata.roll_no = values.roll_no;
        admindummydata.program = values.program;
        admindummydata.branch = values.branch;
        admindummydata.batch = values.batch;
        admindummydata.role = values.role;
      } else {
        console.log("currentUser sent to currentUser backend");
        studentdummydata.name = values.name;
        studentdummydata.email = values.email;
        studentdummydata.phone = values.phone;
        studentdummydata.gender = values.gender;
        studentdummydata.roll_no = values.roll_no;
        studentdummydata.program = values.program;
        studentdummydata.branch = values.branch;
        studentdummydata.batch = values.batch;
        studentdummydata.role = values.role;
      }
    },
  });

  const formcollege = useFormik({
    initialValues: {
      id: "",
      collegename: "",
      streetname: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      emaildomain: "",
    },

    validationSchema: adminValidationSchema,

    onSubmit: async (values) => {
      setIsEditCollegeDetails(true);
      console.log("now");
      console.log(values);
      // if (currentUser?.role === "admin") {
      //   console.log("currentUser sent to admin backend");
      //   collegedummydata.collegename = values.name;
      //   collegedummydata.streetname = values.streetname;
      //   collegedummydata.city = values.city;
      //   collegedummydata.state = values.state;
      //   collegedummydata.pincode = values.pincode;
      //   collegedummydata.country = values.country;
      //   collegedummydata.emaildomain = values.emaildomain;
      // }
    },
  });


  const handleChangeGender = (e) => {
    const name = "gender";
    const value = e.target.value;
    setCurrentUser({ ...currentUser, [name]: value });
  };


  const [fileLink, setFileLink] = useState(form?.values.companyLogo || "");

  const addFileLink = (link) => {
    setFileLink(link);

    form?.setValues({
      ...form?.values,
      companyLogo: link,
    });
  };
  //comment the below code and use the code below this for backend

  useEffect(() => {
    console.log(24)
    const apiData = async () => {
      console.log(234)
        const currUser = await UserService.getCurrentUser();
        console.log(90,currUser)
        if(currUser){
          console.log(2)
         setCurrentUser(currUser.data.user);
          const clg_id = currUser.data.user.college;
          console.log(3,clg_id)
          const clg_data = await collegeService.getCollegeById(clg_id);
          console.log(91,clg_data)
          setCollegeDetails(clg_data.data.college)
        }
    };
    apiData();
  }, []);

  useEffect(()=>{
    console.log(1234,currentUser,collegeDetails);
    if (currentUser?.role === "student") {
      console.log(12345)
      form.setValues({
        ...form.values,
        id: currentUser?._id,
        picture: currentUser?.picture,
        name: currentUser?.name,
        email: currentUser?.email,
        phone: currentUser?.phone,
        gender: currentUser?.gender,
        roll_no: currentUser?.roll_no,
        program: currentUser?.program,
        branch: currentUser?.branch,
        batch: currentUser?.batch,
        role: currentUser?.role,
      });
      formcollege.setValues({
        ...formcollege.values,
        id: collegeDetails?._id,
        collegename: collegeDetails?.college_name,
      });
    } else if (currentUser?.role === "admin") {
      form.setValues({
        ...form.values,
        id: currentUser?._id,
        picture: currentUser?.picture,
        name: currentUser?.name,
        email: currentUser?.email,
        phone: currentUser?.phone,
        gender: currentUser?.gender,
        roll_no: currentUser?.roll_no,
        program: currentUser?.program,
        branch: currentUser?.branch,
        batch: currentUser?.batch,
        role: currentUser?.role,
      });
      formcollege.setValues({
        ...formcollege.values,
        id: collegeDetails?._id,
        collegename: collegeDetails?.college_name,
        streetname: collegeDetails?.street_name,
        city: collegeDetails?.city,
        state: collegeDetails?.state,
        pincode: collegeDetails?.pincode,
        country: collegeDetails?.country,
        emaildomain: collegeDetails?.email_domain,
      });
    }
  },[currentUser,collegeDetails])

  return (
    <div className="bg-[#F4F7FC] h-full flex-col flex justify-center items-center gap-7 p-6 w-full px-4 md:px-16 lg:px-28 py-16">
      <div className="flex  justify-end w-full">
        <div className="px-6 ">
          {isEdit ? (
            <button
              onClick={() => setIsEdit(false)}
              className="text-center border border-[#36518F] text-[#36518F] p-3 font-bold rounded-full w-32"
            >
              Edit User
            </button>
          ) : (
            <button
              onClick={form.handleSubmit}
              className="text-center border px-5 text-white bg-blue-400 hover:bg-blue-500 p-3 font-bold rounded-full w-32"
            >
              Save User Details
            </button>
          )}
        </div>

        <div>
          {isEditCollegeDetails && form.values.role === "admin" ? (
            <button
              onClick={() => setIsEditCollegeDetails(false)}
              className="text-center border border-[#36518F] text-[#36518F] p-3 font-bold rounded-full w-42 h-12"
            >
              Edit collegedetails
            </button>
          ) : (
            <button
              onClick={formcollege.handleSubmit}
              className="text-center border text-white bg-blue-400 hover:bg-blue-500 p-3 font-bold rounded-full w-42 h-12"
            >
              Save College Details
            </button>
          )}
        </div>
      </div>
      <div className="w-full max-sm:w-screen bg-white rounded-2xl lg:px-16 md:px-10 px-4 py-12 flex flex-col gap-y-7 max-sm:h-full drop-shadow">
        <div className="w-full h-full  flex space-x-3 cursor-pointer">
          <div className="rounded-full overflow-hidden">
            {form?.values?.picture ? (
              <div>
                <img
                  className="h-9 w-9 lg:h-10 lg:w-10 object-cover object-center "
                  src={form?.values?.picture}
                  alt={form?.values?.name}
                />
                <div>
                  {/* <Upload onAddFileLink={addFileLink} /> */}
                </div>
              </div>
            ) : (
              <div class="inline-flex items-center justify-center  w-[38px] h-[38px] lg:w-[45px] lg:h-[45px]  bg-gray-400 rounded-full">
                <span class="font-medium text-white text-xl ">
                  {" "}
                  {form?.values?.name ? (
                    <div className="flex items-center">
                      <div>{form?.values?.name[0]}</div>
                      <div>
                        {/* <Upload onAddFileLink={addFileLink} /> */}
                      </div>
                    </div>
                  ) : (
                    `E`
                  )}
                </span>
              </div>
            )}
          </div>
          <button className="max-md:hidden text-[#6F6C99]  border-none  flex items-center space-x-1">
            {/* <span className="font-medium text-md lg:text-lg">{form?.values?.name}</span> */}
          </button>
        </div>

        {/* name and email */}
        <div className="flex md:flex-row flex-col items-center gap-4 md:gap-8 w-full">
          <Input
            name="name"
            touched={form.touched}
            error={form.errors}
            handleChange={form.handleChange}
            value={form.values.name}
            label="Your name"
            disabled={isEdit}
          />
          <Input
            name="email"
            touched={form.touched}
            error={form.errors}
            handleChange={form.handleChange}
            value={form.values.email}
            label="Email ID"
            disabled={true}
          />
        </div>
        {/* phone and collegename */}
        <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
          <Input
            name="phone"
            touched={form.touched}
            error={form.errors}
            handleChange={form.handleChange}
            value={form.values.phone}
            label="Phone Number"
            disabled={isEdit}
          />

          <Input
            name="collegename"
            touched={formcollege.touched}
            error={formcollege.errors}
            handleChange={formcollege.handleChangeCollegeDetails}
            value={formcollege.values.collegename}
            label="College Name"
            disabled={true}
          />
        </div>
        {/* rollno. and batch  */}
        <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
          <Input
            name="roll_no"
            touched={form.touched}
            error={form.errors}
            handleChange={form.handleChange}
            value={form.values.roll_no}
            label="Roll Number"
            disabled={isEdit}
          />

          <Input
            name="batch"
            touched={form.touched}
            error={form.errors}
            handleChange={form.handleChange}
            value={form.values.batch}
            label="Batch"
            disabled={isEdit}
          />
        </div>
        {/* program and branch */}
        <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
          <Input
            name="program"
            touched={form.touched}
            error={form.errors}
            handleChange={form.handleChange}
            value={form.values.program}
            label="Program"
            disabled={isEdit}
          />

          <Input
            name="branch"
            touched={form.touched}
            error={form.errors}
            handleChange={form.handleChange}
            value={form.values.branch}
            label="Branch"
            disabled={isEdit}
          />
        </div>

        {/* role and gender */}
        <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
          <Input
            name="role"
            touched={form.touched}
            error={form.errors}
            handleChange={form.handleChange}
            value={form.values.role}
            label="Role"
            disabled={true}
          />
          {isEdit ? (
            <Input
              name="gender"
              touched={form.touched}
              error={form.errors}
              handleChange={form.handleChange}
              value={form.values.gender}
              label="gender"
              disabled={isEdit}
            />
          ) : (
            <div className="w-full md:flex-1">
              <label>Gender:</label>
              <select
                className="border-2 border-gray-300 w-full py-2 px-4 rounded-lg"
                value={currentUser?.gender}
                onChange={(e) => {
                  handleChangeGender(e);
                }}
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

        {currentUser === "admin" && (
          <div>
            <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
              {/* streetname and city */}
              <Input
                name="streetname"
                touched={formcollege.touched}
                error={formcollege.errors}
                handleChange={formcollege.handleChangeCollegeDetails}
                value={formcollege.values.streetname}
                label="Street Name"
                disabled={isEditCollegeDetails}
              />

              <Input
                name="city"
                touched={formcollege.touched}
                error={formcollege.errors}
                handleChange={formcollege.handleChangeCollegeDetails}
                value={formcollege.values.city}
                label="City"
                disabled={isEditCollegeDetails}
              />
            </div>
            <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
              {/* state and pincode */}
              <Input
                name="state"
                touched={formcollege.touched}
                error={formcollege.errors}
                handleChange={formcollege.handleChangeCollegeDetails}
                value={formcollege.values.state}
                label="State "
                disabled={isEditCollegeDetails}
              />

              <Input
                name="pincode"
                touched={formcollege.touched}
                error={formcollege.errors}
                handleChange={formcollege.handleChangeCollegeDetails}
                value={formcollege.values.pincode}
                label="Pincode"
                disabled={isEditCollegeDetails}
              />
            </div>
            <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
              {/* country and emaildomain */}
              <Input
                name="country"
                touched={formcollege.touched}
                error={formcollege.errors}
                handleChange={formcollege.handleChangeCollegeDetails}
                value={formcollege.values.country}
                label="Country "
                disabled={true}
              />

              <Input
                name="emaildomain"
                touched={formcollege.touched}
                error={formcollege.errors}
                handleChange={formcollege.handleChangeCollegeDetails}
                value={formcollege.values.emaildomain}
                label="Email Domain"
                disabled={true}
              />
            </div>
          </div>
        )}
        {/* about */}
        <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4"></div>
        {/* links */}
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4"></div>
      </div>
    </div>
  );
}

export default ProfileComponent;

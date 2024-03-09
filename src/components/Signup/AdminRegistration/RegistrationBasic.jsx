import { useState } from 'react';
import { FaChevronDown, FaChevronUp  } from "react-icons/fa";
import Link from 'next/link';
const genders = ["male", "female", "others"];
const companyCategory = [
  "Proprietor",
  "Partnership",
  "Limited Liability Partnership",
  "Private Company",
  "Public Company",
];

const RegistrationBasic = ({ details, setDetails, user,formikForm }) => {
//   console.log(user)
  const handleChange = (e) => {
    formikForm.setValues({ ...formikForm.values, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex  flex-col items-center justify-center gap-4 md:py-10">
      <div className="flex  md:flex-row flex-col items-center gap-4 w-full mt-4">
         <div className="w-full flex flex-col md:flex-1">
          <h1 className="text-neutral-500">Full name</h1>
          <input
            type="text"
            placeholder="Enter your Name"
            name="name"
            value={formikForm?.values?.name}
            onChange={formikForm?.handleChange}
            className={`w-full border px-4 py-3 sm:px-6 sm:py-3 ${formikForm?.touched?.name && formikForm?.errors?.name ? "border-red-500":""} rounded-full mt-2 text-lg max-sm:text-sm`}
          />
          <p className="text-xs text-red-500 m-1">{formikForm?.touched?.name && formikForm?.errors?.name}</p>
        </div>
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Email ID</h1>
          <input
            type="email"
            placeholder="Enter your Email Id"
            pattern="/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/"
            name="email"
            value={formikForm?.values?.email}
            onChange={formikForm?.handleChange}
            className={`border w-full  px-4 py-3 sm:px-6 sm:py-3 ${formikForm?.touched?.email && formikForm?.errors?.email ? "border-red-500":""} rounded-full mt-2 text-lg max-sm:text-sm`}
          />
          <p className="text-xs text-red-500 m-1">{formikForm?.touched?.email && formikForm?.errors?.email}</p>
        </div>

      </div>

      <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Mobile Number</h1>
          <input
            type="text"
            placeholder="Enter your Mobile Number"
            name="phone"
            value={formikForm?.values?.phone}
            onChange={(e) => {
              const val = e.target.value;
              if (val.length <= 10 && /^[0-9]*$/.test(val)) {
                handleChange(e);
              }
            }}
            className="border w-full  px-4 py-3 sm:px-6 sm:py-3 rounded-full mt-2 text-lg max-sm:text-sm"
          />
          <p className="text-xs text-red-500 m-1">{formikForm?.touched?.phone && formikForm?.errors?.phone}</p>
        </div>
      <div className="w-full md:flex-1">
        <h1 className="text-neutral-500">Gender</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {genders?.map((gender, index) => (
            <div
              key={index}
              className={`px-4 hover:cursor-pointer font-medium py-1 sm:py-2 border-[#36518F] border-2 rounded-full mt-4 ${formikForm?.values.gender.toLowerCase() === gender.toLowerCase()
                ? "text-white bg-[#36518F]"
                : "text-[#36518F] bg-white"
                } capitalize`}
              onClick={() =>
                formikForm.setValues({ ...formikForm?.values, gender: gender.toLowerCase() })
              }
            >
              {gender}
            </div>
          ))}
        </div>
        <p className="text-xs text-red-500 m-1">{formikForm?.touched?.gender && formikForm?.errors?.gender}</p>
      </div>
      </div>
    </div>
  );
};

export default RegistrationBasic;

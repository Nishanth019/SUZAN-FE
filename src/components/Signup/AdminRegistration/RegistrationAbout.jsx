import Link from "next/link";
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import collegeService from "@/services/college.service";
import toast from "react-hot-toast";


const RegistrationAbout = ({ details, setDetails, onCheckboxChange, errors }) => {
  const router = useRouter();
  const { isAuth } = useGlobalContext();
  const [logo,setLogo]=useState(null);
   const [isEdit, setIsEdit] = useState(true);
  if (isAuth) {
    router.push("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails({ ...details, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    onCheckboxChange(e.target.checked); 
  };

    const handleUploadLogo = async (e) => {
      const file = e.target.files[0];
      console.log(23, file);
      try {
        const formData = new FormData();
        formData.append("picture", file);
        // formData.append("userData", JSON.stringify(userData)); // Append other user data
        console.log(23333, formData);
        const response = await collegeService.uploadLogo(formData);
        // console.log(2444, response);
        setLogo(response.data.picture)
        setDetails({ ...details, college_logo: response.data.picture });
        console.log(2444, response);
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

  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <div className="flex flex-col items-center gap-4 w-full mt-4">
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">College Name</h1>
          <input
            type="text"
            placeholder="Enter your college Name"
            name="college_name"
            value={details.college_name}
            onChange={handleChange}
            className={`border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg ${
              errors.college_name ? "border-red-500" : ""
            }`}
          />
          <p className="text-xs text-red-500 m-1">{errors.college_name}</p>
        </div>
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">College Email domain</h1>
            <input
              type="text"
              placeholder="Ex: iiitdmj.ac.in"
              name="email_domain"
              value={details.email_domain}
              onChange={handleChange}
              className={`border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg ${
                errors.email_domain ? "border-red-500" : ""
              }`}
            />
            <p className="text-xs text-red-500 m-1">{errors.email_domain}</p>
          </div>

          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Street Name</h1>
            <input
              type="text"
              placeholder="Enter your College Street Name"
              name="street_name"
              value={details.street_name}
              onChange={handleChange}
              className={`border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg ${
                errors.street_name ? "border-red-500" : ""
              }`}
            />
            <p className="text-xs text-red-500 m-1">{errors.street_name}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">City</h1>
            <input
              type="text"
              placeholder="Enter your College City"
              name="city"
              value={details.city}
              onChange={handleChange}
              className={`border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg ${
                errors.city ? "border-red-500" : ""
              }`}
            />
            <p className="text-xs text-red-500 m-1">{errors.city}</p>
          </div>
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">State</h1>
            <input
              type="text"
              placeholder="Enter your College State"
              name="state"
              value={details.state}
              onChange={handleChange}
              className={`border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg ${
                errors.state ? "border-red-500" : ""
              }`}
            />
            <p className="text-xs text-red-500 m-1">{errors.state}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Country</h1>
            <input
            disabled
              type="text"
              placeholder="Enter your College Country"
              name="country"
              value={details.country}
              onChange={handleChange}
              className={`border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg ${
                errors.country ? "border-red-500" : ""
              }`}
            />
            <p className="text-xs text-red-500 m-1">{errors.country}</p>
          </div>
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Pincode</h1>
            <input
              type="text"
              placeholder="Enter your College Pincode"
              name="pincode"
              value={details.pincode}
              onChange={handleChange}
              className={`border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg ${
                errors.pincode ? "border-red-500" : ""
              }`}
            />
            <p className="text-xs text-red-500 m-1">{errors.pincode}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
  <div className="w-full md:flex-1">
    <div>
      <div className="rounded-full overflow-hidden">
        {details.college_logo ? (
          <img
            className="h-12 w-12 lg:h-16 lg:w-16 object-cover object-center rounded-full"
            src={details.college_logo}
            alt={details.college_name || "College Logo"}
          />
        ) : (
          <div className="inline-flex items-center justify-center w-[38px] h-[38px] lg:w-[45px] lg:h-[45px] bg-gray-400 rounded-full">
            <span className="font-medium text-white text-xl">
              {details.college_name ? details.college_name[0] : "E"}
            </span>
          </div>
        )}
      </div>
        
          <label
            htmlFor="fileInput"
            className="text-blue-400 cursor-pointer text-sm"
          >
            Upload College Logo
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleUploadLogo}
            className="hidden"
          />
      {errors.college_logo && (
        <p className="text-red-500 text-sm mt-1">{errors.college_logo}</p>
      )}
    </div>
  </div>
</div>


      <div className="flex justify-start items-center text-center gap-4">
        <input
          type="checkbox"
          id="terms-condition"
          name="termsAndConditions"
          onChange={handleCheckboxChange}
          className="w-[18px] h-[18px] mt-6 mb-6"
        />
        <p className="text-[14px]">
          I agree to{" "}
          <Link
            href="/terms"
            className="text-bold text-green-600 cursor-pointer"
          >
            Terms & Conditions
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationAbout;

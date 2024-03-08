import { MdOutlineDeleteForever } from "react-icons/md";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Upload } from "@/components/Utils/UploadModal/Upload";
import Link from "next/link";
const RegistrationAbout = ({
  details,
  setDetails,
  formikForm,
  onCheckboxChange,
}) => {
  const [fileLink, setFileLink] = useState(
    formikForm?.values.companyLogo || ""
  );
  const [documentLinks, setDocumentLinks] = useState([]);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleChangeName = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      companyName: e.target.value,
    }));
  };

  const handleCheckboxChange = (e) => {
    //  setSelectedOther(e.target.checked);
    onCheckboxChange(e.target.checked); // Notify parent component about checkbox change
  };
  const addFileLink = (link) => {
    setFileLink(link);

    formikForm?.setValues({
      ...formikForm?.values,
      companyLogo: link,
    });
  };

  const addDocumentLink = (link) => {
    setDocumentLinks([...documentLinks, link]);

    setDetails((prevDetails) => ({
      ...prevDetails,
      documents: [...prevDetails.documents, link],
    }));
    formikForm?.setValues({
      ...formikForm?.values,
      documents: [...formikForm?.values?.documents, link],
    });
  };
  //   const updateSocialProfile = (platform, profileUrl) => {
  //     const updatedProfiles = social?.map((profile) => {
  //       if (profile.platform === platform) {
  //         return { ...profile, profileUrl };
  //       }
  //       return profile;
  //     });

  //     setSocial(updatedProfiles);
  //   };

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");
  // const [selectedOther, setSelectedOther] = useState(false);

  // //button styling change
  // const handleOptionChange = (e) => {
  //   setDetails({ ...details, [e.target.name]: e.target.value });
  //   setSelectedOption(e.target.value);
  //   if (e.target.value === "other") {
  //     setSelectedOther(true);
  //   } else {
  //     setSelectedOther(false);
  //   }
  // };

  // const toggleDropdown = () => {
  //   setIsDropdownOpen((prev) => !prev);
  // };

  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <div className="flex  flex-col items-center gap-4 w-full mt-4">
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">College Name</h1>
            <input
              type="text"
              name="collegeName"
              value={details?.values?.collegeName}
              onChange={handleChange}
              className="border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
            />
          </div>
        </div>

        {/* <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
        {socialProfiles?.slice(0, 2)?.map((profile, index) => (
          <div key={index} className="w-full md:flex-1">
            <h1 className="text-neutral-500">
              {profile.platform} Profile link (Optional)
            </h1>
            <input
              type="text"
              placeholder={`Paste ${profile.platform} link`}
              name={profile.platform.toLowerCase()}
              onChange={(e) =>
                updateSocialProfile(profile.platform, e.target.value)
              }
              className="border w-full px-6 py-3 rounded-full mt-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
      </div> */}

        {/* <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
        {socialProfiles?.slice(2, 4)?.map((profile, index) => (
          <div key={index} className="w-full md:flex-1">
            <h1 className="text-neutral-500">
              {profile.platform} Profile link (Optional)
            </h1>
            <input
              type="text"
              placeholder={`Paste ${profile.platform} link`}
              name={profile.platform.toLowerCase()}
              onChange={(e) =>
                updateSocialProfile(profile.platform, e.target.value)
              }
              className="border w-full px-6 py-3 rounded-full mt-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
      </div> */}
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Program</h1>
            <input
              type="text"
              placeholder="Enter your Program"
              name="program"
              value={details?.values?.program}
              onChange={handleChange}
              className="border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
            />
          </div>
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Branch/Discipline</h1>
            <input
              type="text"
              placeholder="Enter your Branch"
              name="branch"
              value={details?.values?.branch}
              onChange={handleChange}
              className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Roll No</h1>
            <input
              type="text"
              name="rollNo"
              placeholder="Enter Your college Roll Number"
              value={details?.values?.rollNo}
              onChange={handleChange}
              className={`w-full border  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm ${
                formikForm?.touched?.location && formikForm?.errors?.location
                  ? "border-red-500"
                  : ""
              } rounded-full mt-2 text-lg`}
            />
            <p className="text-xs text-red-500 m-1">
              {formikForm?.touched?.location && formikForm?.errors?.location}
            </p>
          </div>
          <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Batch</h1>
            <input
              type="text"
              name="batch"
              placeholder="Enter Your Batch"
              value={details?.values?.batch}
              onChange={handleChange}
              className={`w-full border  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm ${
                formikForm?.touched?.location && formikForm?.errors?.location
                  ? "border-red-500"
                  : ""
              } rounded-full mt-2 text-lg`}
            />
            <p className="text-xs text-red-500 m-1">
              {formikForm?.touched?.location && formikForm?.errors?.location}
            </p>
          </div>
        </div>

        <div className="flex  justify-start items-center text-center gap-4">
          <input
            type="checkbox"
            id="terms-condition"
            name="termsAndConditions"
            onChange={handleCheckboxChange}
            className="w-[18px] h-[18px] mt-6 mb-6"
          />
          <p className=" text-[14px]">
            I agree to{" "}
            <Link
              href="/terms"
              className="text-bold text-green-600 cursor-pointer"
            >
              Terms & Conditions
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationAbout;

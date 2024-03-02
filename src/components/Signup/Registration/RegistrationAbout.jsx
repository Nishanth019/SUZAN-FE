import { MdOutlineDeleteForever } from "react-icons/md";
import { useState } from "react";
import { FaChevronDown, FaChevronUp  } from "react-icons/fa";
import { Upload } from "@/components/Utils/UploadModal/Upload";
const RegistrationAbout = ({
  details,
  setDetails,

  formikForm,
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

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOther, setSelectedOther] = useState(false);
  

  //button styling change
  const handleOptionChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
    setSelectedOption(e.target.value);
    if (e.target.value === 'other') {
      setSelectedOther(true);
    }
    else {
      setSelectedOther(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };


  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <div className="flex  flex-col items-center gap-4 w-full mt-4">
        <div className="w-full md:w-full md:flex-1">
          <h1 className="text-neutral-500">Select College</h1>

          <div
            onClick={toggleDropdown}
            className="w-full border px-4 py-3 sm:px-6 sm:py-3  rounded-full mt-2 text-lg "
          >
            <div className="relative w-full">
              <select
                value={details?.values?.collegeName}
                onChange={handleOptionChange}
                className="appearance-none  w-full  rounded px-4  leading-tight focus:outline-none focus:border-blue-500 max-sm:text-sm"
              >
                <option value="iiitjabalpur">IIIT Jabalpur</option>
                <option value="jabalpurengineeringcollege">Jabalpur Engineering College</option>
                <option value="ranidurgavathiinstitute">Rani Durgavathi Institute</option>
                <option value="other">Other</option>
              </select>

              {/* Arrow icon */}
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none px-1">
                {!isDropdownOpen ? (
                  <FaChevronDown  className="h-4 w-4 text-gray-600" />
                ) : (
                  <FaChevronUp className="h-4 w-4 text-gray-600" />
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-red-500 m-1">{formikForm?.touched?.name && formikForm?.errors?.name}</p>
        </div>
        {selectedOther && (
        <>
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
            
            <div className="w-full md:flex-1">
              <h1 className="text-neutral-500">College Name</h1>
              <input
                type="text"
                placeholder="Enter your collage Name"
                name="collegeName"
                value={details?.values?.collegeName}
                onChange={handleChange}
                className="border w-full px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg "
              />
            </div>
            <div className="w-full md:flex-1">
              <h1 className="text-neutral-500">Street Name</h1>
              <input
                type="text"
                placeholder="Enter your Street Name"
                name="streetName"
                value={details?.values?.setStreetName}
                onChange={handleChange}

                className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
              />
            </div>
        </div>
        <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
            

            <div className="w-full md:flex-1">
              <h1 className="text-neutral-500">City</h1>
              <input
                type="text"
                placeholder="Enter your City"
                name="city"
                value={details?.values?.city}
                onChange={handleChange}
                className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
              />
            </div>
            <div className="w-full md:flex-1">
              <h1 className="text-neutral-500">State</h1>
              <input
                type="text"
                placeholder="Enter your State"
                name="state"
                value={details?.values?.state}
                onChange={handleChange}
                className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
              />
            </div>
         </div>
          <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
            <div className="w-full md:flex-1">
              <h1 className="text-neutral-500">Country</h1>
              <input
                type="text"
                placeholder="Enter your Country"
                name="country"
                value={details?.values?.country}
                onChange={handleChange}
                className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
              />
              </div>
            <div className="w-full md:flex-1">
              <h1 className="text-neutral-500">Pincode</h1>
              <input
                type="text"
                placeholder="Enter your Pincode"
                name="pincode"
                value={details?.values?.pincode}
                onChange={handleChange}
                className="border w-full  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm rounded-full mt-2 text-lg"
              />
            </div>
            
          </div>
        </>
      )}
       
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
                className={`w-full border  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm ${formikForm?.touched?.location && formikForm?.errors?.location ? "border-red-500":""} rounded-full mt-2 text-lg`}
            />
            <p className="text-xs text-red-500 m-1">{formikForm?.touched?.location && formikForm?.errors?.location}</p>
            </div>
            <div className="w-full md:flex-1">
            <h1 className="text-neutral-500">Batch</h1>
            <input
                type="text"
                name="batch"
                placeholder="Enter Your Batch"
                value={details?.values?.batch}
                onChange={handleChange}
                className={`w-full border  px-4 py-3 sm:px-6 sm:py-3 max-sm:text-sm ${formikForm?.touched?.location && formikForm?.errors?.location ? "border-red-500":""} rounded-full mt-2 text-lg`}
            />
            <p className="text-xs text-red-500 m-1">{formikForm?.touched?.location && formikForm?.errors?.location}</p>
            </div>
        </div>
         <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Upload College ID card</h1>
          <div className="flex flex-row items-center gap-x-3">
            <Upload  onAddFileLink={addFileLink} type="Image" ratio={1} />
            <a className="text-[#B8B8B8]" href={fileLink} target="_blank">
              {fileLink
                ? fileLink.split("/").pop().substring(0, 40) + "..."
                : "id_card.png"}
            </a>
            {fileLink && (
              <span className="text-red-400">
                <MdOutlineDeleteForever
                  onClick={(e) => {
                    e.preventDefault();
                    setFileLink("");
                  }}
                />
              </span>
            )}
          </div>
          <p className="text-xs text-red-500 m-1">
            {formikForm?.touched?.companyLogo &&
              formikForm?.errors?.companyLogo}
          </p>

          {!fileLink &&
            !(
              formikForm?.touched?.companyLogo &&
              formikForm?.errors?.companyLogo
            ) && (
              <div className="text-xs my-1 text-slate-400">
                Only Images which have 1:1 resolution ratio (i.e., 400x400 px)
                are accepted
              </div>
            )}
        </div>
    </div>
  );
};

export default RegistrationAbout;
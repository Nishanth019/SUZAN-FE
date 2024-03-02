import { DeleteForeverOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Upload } from "./UploadModal/upload";
const RegistrationAbout = ({
  details,
  setDetails,
  social,
  setSocial,
  formikForm,
}) => {
  const [fileLink, setFileLink] = useState(
    formikForm?.values.companyLogo || ""
  );
  const [documentLinks, setDocumentLinks] = useState([]);
  const [socialProfiles, setSocialProfiles] = useState([
    {
      platform: "LinkedIn",
      profileUrl: "",
    },
    {
      platform: "Facebook",
      profileUrl: "",
    },
    {
      platform: "Instagram",
      profileUrl: "",
    },
    {
      platform: "Twitter",
      profileUrl: "",
    },
  ]);

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
  const updateSocialProfile = (platform, profileUrl) => {
    const updatedProfiles = social?.map((profile) => {
      if (profile.platform === platform) {
        return { ...profile, profileUrl };
      }
      return profile;
    });

    setSocial(updatedProfiles);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="flex items-center gap-10 md:flex-row flex-col w-full md:mt-4">
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Company Name</h1>
          <input
            type="text"
            placeholder="e.g. Edzer"
            name="companyName"
            value={formikForm?.values?.companyName}
            onChange={formikForm?.handleChange}
            className={`border w-full px-6 py-3 ${
              formikForm?.touched?.companyName &&
              formikForm?.errors?.companyName
                ? "border-red-500"
                : ""
            } rounded-full mt-2 focus:outline-none focus:border-blue-500`}
          />
          <p className="text-xs text-red-500 m-1">
            {formikForm?.touched?.companyName &&
              formikForm?.errors?.companyName}
          </p>
        </div>
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Upload Logo</h1>
          <div className="flex flex-row items-center gap-x-3">
            <Upload onAddFileLink={addFileLink} type="Image" ratio={1} />
            <a className="text-[#B8B8B8]" href={fileLink} target="_blank">
              {fileLink
                ? fileLink.split("/").pop().substring(0, 40) + "..."
                : "company_logo.png"}
            </a>
            {fileLink && (
              <span className="text-red-400">
                <DeleteForeverOutlined
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
      <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
        <div className="w-full md:w-full md:flex-1">
          <h1 className="text-neutral-500">About Company (Employer)</h1>
          <textarea
            rows={6}
            type="text"
            name="about"
            value={formikForm.values.about}
            onChange={formikForm.handleChange}
            placeholder="e.g. Edzer is an edtech platform committed to transforming the way students and job seekers learn and prepare for their career goals. We offer a diverse range of expert-curated courses across multiple disciplines, enriched with immersive content and practical insights. "
            className={`focus:outline-none ${
              formikForm?.touched?.about && formikForm?.errors?.about
                ? "border-red-500"
                : ""
            } focus:border-blue-500 w-full border px-6 pt-3 pb-6 rounded-[24px] mt-2 text-lg resize-none placeholder:font-light placeholder:text-base`}
          />
          <p className="text-xs text-red-500 m-1">
            {formikForm?.touched?.about && formikForm?.errors?.about}
          </p>
        </div>
      </div>
      <div className="mt-4 w-full">
        <h1 className="text-neutral-600 font-medium">
          Upload Document (Attach atleast one of these)
        </h1>
        <ol type="1" className="list-num px-6 mt-2">
          <li className="text-neutral-600 font-medium py-1">
            COI of the company
          </li>
          <li className="text-neutral-600 font-medium py-1">GSTIN</li>
          <li className="text-neutral-600 font-medium py-1">
            Registration Certificate as a Proprietor/LLP/Partnership
          </li>
        </ol>
        <div className="flex flex-row max-sm:flex-col w-fit items-center gap-x-3">
          <Upload onAddFileLink={addDocumentLink} />
          <div className="flex flex-col gap-y-3">
            {documentLinks?.map((item,index) => (
              <div className="flex gap-2">
                <a className="text-[#24AD5D]" href={item} target="_blank">
                {item?.split("/").pop().substring(0, 40) + "..."}
              </a>
               
                <span className="text-red-400">
                  <DeleteForeverOutlined
                    onClick={(e) => {
                      e.preventDefault();
                      const docs = [...documentLinks];
                      const docs2 = formikForm?.values?.documents
                      docs.splice(index,1);
                      docs2.splice(index,1);
                      formikForm?.setValues({
                        ...formikForm?.values,
                        documents: docs2,
                      });
                      setDocumentLinks(docs);
                    }}
                  />
                </span>
          
              </div>
            ))}

          </div>
        </div>
        <p className="text-xs text-red-500 m-1">
          {formikForm?.touched?.documents && formikForm?.errors?.documents}
        </p>
        <input type="text" className="hidden" id="uploaddocs" />
      </div>
      <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
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
      </div>

      <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
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
      </div>
    </div>
  );
};

export default RegistrationAbout;
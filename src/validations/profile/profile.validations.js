import * as yup from "yup";

export const adminValidationSchema = yup.object({
  fullName: yup
    .string("")
    .required("Name is required")
    .trim()
    .matches(/^[a-zA-Z ]*$/, "Please enter a valid name"),
  email: yup
    .string("")
    .required("Email is required")
    .trim()
    .matches(/^\S+@\S+\.\S+$/, "Please enter a valid Email"),
  mobile: yup
    .string("")
    .required("Phone is required")
    .matches("^[0-9]{10}$", "Please provide a valid mobile number"),
  location: yup.string("").required("Location is required").trim(),
  gender: yup.string("").required("Gender is required").trim(),
  category: yup.string("").required("Category is required").trim(),
  about: yup.string("").required("About is required").trim(),
  companyName: yup.string("").trim(),
  socialProfiles: yup.array("").required("SocialProfiles are required"),
});

export const studentValidationSchema = yup.object({
  fullName: yup
    .string("")
    .required("Name is required")
    .trim()
    .matches(/^[a-zA-Z ]*$/, "Please enter a valid name"),
  email: yup
    .string("")
    .required("Email is required")
    .trim()
    .matches(/^\S+@\S+\.\S+$/, "Please enter a valid Email"),
  mobile: yup
    .string("")
    .required("Phone is required")
    .matches("^[0-9]{10}$", "Please provide a valid mobile number"),
  location: yup.string("").required("Location is required").trim(),
  gender: yup.string("").required("Gender is required").trim(),
  about: yup.string("").required("About is required").trim(),
  linkedin: yup
    .string("")
    .trim()
    .matches(/^https:\/\/.*/, "Invalid URL."),
  twitter: yup
    .string("")
    .trim()
    .matches(/^https:\/\/.*/, "Invalid URL."),
  facebook: yup
    .string("")
    .trim()
    .matches(/^https:\/\/.*/, "Invalid URL."),
  instagram: yup
    .string("")
    .trim()
    .matches(/^https:\/\/.*/, "Invalid URL."),
  socialProfiles: yup.array("").required("SocialProfiles are required"),
});

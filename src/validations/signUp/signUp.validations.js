import * as yup from "yup";

export const SignupValidation = yup.object({
  name: yup
    .string("")
    .required("Name is required")
    .trim()
    .matches("^[a-zA-Z ]*$", "Please enter a valid name"),
  email: yup
    .string("")
    .required("Email is required")
    .trim()
    .matches(/^\S+@\S+\.\S+$/, "Please enter a valid Email"),
  phone: yup
    .string("")
    .required("Phone is required")
    .matches("^[0-9]{10}$", "Please provide a valid mobile number"),
  // phone : yup.string("").required("Phone is required").trim(),
  location: yup.string("").required("Location is required").trim(),
  gender: yup.string("").required("Gender is required").trim(),
  category: yup.string("").required("Category is required").trim(),
});
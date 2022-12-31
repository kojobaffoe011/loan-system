import * as yup from "yup";
import isValidDate from "./isValidDate";

export const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  marriage: yup
    .string()
    .oneOf(
      ["Single", "Married", "Prefer not to say"],
      "Please select a valid option"
    )
    .required("Marriage status is required"),
  employment: yup
    .string()
    .oneOf(
      ["Employed", "Unemployed", "Self-Employed"],
      "Please select a valid option"
    )
    .required("Employment status is required"),
  companyName: yup.string().when("employment", {
    is: "Unemployed",
    then: yup.string().notRequired(),
    otherwise: yup.string().required("Employer name is required"),
  }),
  dob: yup
    .string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/,
      "Date format should be dd/mm/yyyy"
    )
    .test("valid-date", "Invalid date, Age must be over 18", (value) => {
      const [day, month, year] = value.split("/");
      return isValidDate(+day, +month, +year);
    })
    .required("Date of birth is required"),

  idType: yup
    .string()
    .oneOf(
      ["Passport", "NHIS", "Driver's License"],
      "Please select a valid option"
    )
    .required("ID type is required"),
  idNumber: yup
    .string()
    .min(6, "6 charaters or more")
    .required("ID Number is required"),
  phone: yup
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  agreeBox: yup.boolean().oneOf([true], "Please tick checkbox"),
});

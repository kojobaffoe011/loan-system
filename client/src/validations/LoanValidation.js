import * as yup from "yup";

export const LoanSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  loanName: yup
    .string()
    .oneOf(
      [
        "Business Loan",
        "Afrifa Loans",
        "Abanaa Loans",
        "Olale Loans",
        "Car Loan",
        "Home Loan",
        "Buff Loans",
        "Government Loans",
        "Erasmus Loans",
        "Masadh Loans",
      ],
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
  annualSalary: yup.string().when("employment", {
    is: "Unemployed",
    then: yup.string().notRequired(),
    otherwise: yup.string().required("Annual Salary is required"),
  }),
  loanPurpose: yup
    .string()
    .oneOf(
      ["Health Care", "Big Purchase", "Investment", "Other"],
      "Please select a valid option"
    )
    .required("Loan Purpose is required"),
  customerID: yup
    .string()
    .min(6, "6 charaters or more")
    .required("ID Number is required"),
  agreeBox: yup.boolean().oneOf([true], "Please tick checkbox"),
});

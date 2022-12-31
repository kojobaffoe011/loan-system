import React, { useEffect, useState } from "react";
import { userSchema } from "../validations/CustomerValidation";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { LoanSchema } from "../validations/LoanValidation";
import { Link } from "react-router-dom";
import back from "../assets/back.svg";
import Modal from "../components/Modal";
import { showErrorToast, showSuccessToast } from "../components/Toast";

const fetchLoans = () => {
  return axios("http://localhost:8888/loans");
};

const ApplyLoan = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchLoans()
      .then(({ data }) => {
        setLoans(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div>
          <p>Please exercise some patience</p>
        </div>
      );
    }
    return loans.map((loan, index) => {
      return <option key={index}>{loan.name}</option>;
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoanSchema),
  });

  const formSubmitHandler = (data) => {
    if (Object.keys(errors).length === 0) {
      axios
        .post("https://buff-loans.herokuapp.com/apply-loans", {
          name: data.name,
          loanName: data.loanName,
          employment: data.employment,
          annualSalary: data.annualSalary,
          loanPurpose: data.loanPurpose,
          customerID: data.customerID,
        })

        .then((response) => {
          if (response.data.errorState === true) {
            setIsModalOpen(false);
            setIsSubmitted(false);
            showErrorToast(response.data.message);
          } else {
            setIsModalOpen(true);
            setIsSubmitted(true);
            reset();
            showSuccessToast(response.data.message);
          }
        })
        .catch((error) => {
          showErrorToast("No Server Response");
        });
    }
  };

  return (
    <div className="">
      <div className="mt-8">
        <Link to={-1}>
          <img src={back} alt="" height="40" width="40" />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="mt-8 mb-2 font-extrabold text-4xl whitespace-nowrap ">
          Apply for a loan
        </h1>
        <h1 className="mt-2 font-light text-sm">Fill this form</h1>
        <div className="mt-12 w-full">
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <div className="flex flex-col max-w-lg mx-auto">
              <label className="mb-2">Full Name</label>
              <input
                {...register("name")}
                name="name"
                type="text"
                placeholder="Jane Doe"
                className="appearance-none border rounded-lg w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none"
              />
              {errors.name ? (
                <span className="text-red-600">{errors.name.message}</span>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col max-w-lg mx-auto">
              <label className="mb-2 mt-8">Select Loan</label>
              <select
                {...register("loanName")}
                name="loanName"
                defaultValue="Select an option"
                className="appearance-none border rounded-lg w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none"
              >
                <option disabled hidden>
                  Select an option
                </option>
                {renderContent()}
              </select>
              {errors.loanName ? (
                <span className="text-red-600">{errors.loanName.message}</span>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col max-w-lg mt-8 mx-auto">
              <label className="mb-2 whitespace-nowrap">
                Employment Status
              </label>
              <select
                {...register("employment")}
                name="employment"
                defaultValue="Select an option"
                className="appearance-none border rounded-lg w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none"
              >
                <option disabled hidden className="text-gray-50">
                  Select an option
                </option>
                <option>Employed</option>
                <option>Unemployed</option>
                <option>Self-Employed</option>
              </select>
              {errors.employment ? (
                <span className="text-red-600">
                  {errors.employment.message}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col max-w-lg mt-8 mx-auto">
              <label className="mb-2 whitespace-nowrap">Annual Salary</label>
              <input
                {...register("annualSalary")}
                name="annualSalary"
                type="number"
                placeholder="0.00"
                className="appearance-none border rounded-lg w-full py-4 px-4  text-gray-700 leading-tight focus:outline-none"
              />

              {errors.annualSalary ? (
                <span className="text-red-600">
                  {errors.annualSalary.message}
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col max-w-lg mt-8 mx-auto">
              <label className="mb-2">Purpose of loan</label>
              <select
                {...register("loanPurpose")}
                name="loanPurpose"
                defaultValue="Select an option"
                className="appearance-none border rounded-lg w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none"
              >
                <option disabled hidden className="text-gray-50">
                  Select an option
                </option>
                <option>Health Care</option>
                <option>Big Purchase</option>
                <option>Investment</option>
                <option>Other</option>
              </select>
              {errors.loanPurpose ? (
                <span className="text-red-600">
                  {errors.loanPurpose.message}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="flex space-x-4 items-center max-w-lg mt-8 mx-auto justify-between">
              <div className="flex flex-col w-full ">
                <label className="mb-2 whitespace-nowrap">ID Number</label>
                <input
                  {...register("customerID")}
                  name="customerID"
                  type="text"
                  placeholder="MXB128190"
                  className="appearance-none border rounded-lg w-full py-4 px-4  text-gray-700 leading-tight focus:outline-none"
                />
                {errors.customerID ? (
                  <span className="text-red-600">
                    {errors.customerID.message}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex space-x-4 max-w-lg mx-auto items-center">
              <div className="flex h-full items-end mb-2 mt-8">
                <input
                  type="checkbox"
                  {...register("agreeBox")}
                  name="agreeBox"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-4 mt-8 ">
                  Agree to terms and conditions
                </label>

                {errors.agreeBox ? (
                  <span className="text-red-600">
                    {errors.agreeBox.message}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex flex-col max-w-lg mx-auto">
              <button className="border rounded-lg w-full py-4 px-4 mb-8 mt-8 bg-orange-600 leading-tight hover:bg-orange-500">
                <p className="text-gray-50">Submit</p>
              </button>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} /> : ""}
    </div>
  );
};

export default ApplyLoan;

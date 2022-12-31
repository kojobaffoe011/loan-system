import React, { useState } from "react";
import { userSchema } from "../validations/CustomerValidation";
import * as yup from "yup";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link } from "react-router-dom";
import back from "../assets/back.svg";
import Modal from "../components/Modal";
import { showErrorToast, showSuccessToast } from "../components/Toast";
import Loader from "../components/Loader";

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const formSubmitHandler = (data, validationResult) => {
    if (Object.keys(errors).length === 0) {
      axios
        .post("https://buff-loans.herokuapp.com/register", {
          name: data.name,
          marriage: data.marriage,
          employment: data.employment,
          companyName: data.companyName,
          dob: data.dob,
          idType: data.idType,
          idNumber: data.idNumber,
          phone: data.phone,
          address: data.address,
        })
        .then((response) => {
          if (response.data.errorState === false) {
            reset();
            setIsModalOpen(true);
            showSuccessToast("Successfully Registered");
          } else if (response.data.error.code === "ER_DUP_ENTRY") {
            showErrorToast(
              "ID already exists, two customers can't have the same ID"
            );
          } else {
            showErrorToast(response.data.error.code);
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
        <h1 className="mt-8 mb-2 font-extrabold text-4xl">Welcome</h1>
        <h1 className="mt-2 font-light text-sm">Register here</h1>
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
              <label className="mb-2 mt-8 whitespace-nowrap">
                Marital Status
              </label>
              <select
                {...register("marriage")}
                name="marriage"
                defaultValue="Select an option"
                className="appearance-none border rounded-lg w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none"
              >
                <option disabled hidden>
                  Select an option
                </option>
                <option>Single</option>
                <option>Married</option>
                <option>Prefer not to say</option>
              </select>
              {errors.marriage ? (
                <span className="text-red-600">{errors.marriage.message}</span>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col max-w-lg mx-auto">
              <label className="mb-2 mt-8 whitespace-nowrap">
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

            <div className="flex flex-col max-w-lg mx-auto">
              <label className="mb-2 mt-8">Name of Employer</label>
              <input
                {...register("companyName")}
                name="companyName"
                type="text"
                placeholder="Company Name"
                className="appearance-none border rounded-lg w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none"
              />
              {errors.companyName ? (
                <span className="text-red-600">
                  {errors.companyName.message}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col max-w-lg mt-8 mx-auto">
              <label className="mb-2">Date of Birth</label>
              <input
                {...register("dob")}
                name="dob"
                type="text"
                placeholder="DD/MM/YYYY"
                className="appearance-none border rounded-lg w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none"
              />
              {errors.dob ? (
                <span className="text-red-600">{errors.dob.message}</span>
              ) : (
                ""
              )}
            </div>
            {/* <div className="flex space-x-4 items-center max-w-lg mt-8 mx-auto justify-between"> */}
            <div className="flex flex-col max-w-lg mx-auto">
              <label className="mb-2 mt-8  whitespace-nowrap">
                ID Card Type
              </label>
              <select
                {...register("idType")}
                name="idType"
                defaultValue="Select an option"
                className="appearance-none border rounded-lg w-full py-4 px-4  text-gray-700 leading-tight focus:outline-none"
              >
                <option disabled hidden>
                  Select an option
                </option>
                <option>Passport</option>
                <option>NHIS</option>
                <option>{`Driver's License`}</option>
              </select>
              {errors.idType ? (
                <span className="text-red-600">{errors.idType.message}</span>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col max-w-lg mx-auto">
              <label className="mb-2 mt-8  whitespace-nowrap">ID Number</label>
              <input
                {...register("idNumber")}
                name="idNumber"
                type="text"
                placeholder="MS7219920"
                className="appearance-none border rounded-lg w-full py-4 px-4  text-gray-700 leading-tight focus:outline-none"
              />
              {errors.idNumber ? (
                <span className="text-red-600">{errors.idNumber.message}</span>
              ) : (
                ""
              )}
            </div>
            {/* </div> */}
            <div className="flex flex-col max-w-lg mx-auto">
              <label className="mb-2 mt-8 whitespace-nowrap">
                Phone Number
              </label>
              <input
                {...register("phone")}
                name="phone"
                type="number"
                placeholder="0244123456"
                className="appearance-none border rounded-lg w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            <div className="flex max-w-lg mx-auto">
              {errors.phone ? (
                <span className="text-red-600">{errors.phone.message}</span>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col max-w-lg mx-auto">
              <label className="mb-2 mt-8">Address</label>
              <input
                {...register("address")}
                name="address"
                type="text"
                placeholder="214 Obono Street, Accra-Ghana"
                className="appearance-none border rounded-lg w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            <div className="flex max-w-lg mx-auto">
              {errors.address ? (
                <span className="text-red-600">{errors.address.message}</span>
              ) : (
                ""
              )}
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
                <label className=" mt-8 ">Agree to terms and conditions</label>

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
              <button
                className="border rounded-lg w-full py-4 px-4 mb-8 mt-12 bg-orange-600 leading-tight hover:bg-orange-500"
                type="submit"
              >
                {isSubmitted ? "..." : <p className="text-gray-50">Register</p>}
              </button>
            </div>
          </form>
        </div>
        {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} /> : ""}
      </div>
    </div>
  );
};

export default Register;

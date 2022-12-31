import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import pfp from "../assets/pfp.svg";
import Loans from "../components/Loans";
import back from "../assets/back.svg";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const CustomerProfile = () => {
  const { ID, IDNum } = useParams();
  const [customerID, setCustomerID] = useState(ID);
  const [customerIDNum, setCustomerIDNum] = useState(IDNum);
  const [customer, setCustomer] = useState([""]);
  const [customerLoans, setCustomerLoans] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(customerLoans);
  console.log(customer);

  const fetchCustomer = () => {
    return axios(
      `https://buff-loans.herokuapp.com/customer/${customerID}/${customerIDNum}`
    );
  };

  const fetchCustomerLoans = () => {
    return axios(
      `https://buff-loans.herokuapp.com/appliedloans/${customerIDNum}`
    );
  };

  useEffect(() => {
    fetchCustomer()
      .then(({ data }) => {
        setCustomer(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchCustomerLoans()
      .then(({ data }) => {
        setCustomerLoans(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="mt-8">
        <Link to={-1}>
          <img src={back} alt="" height="40" width="40" />
        </Link>
      </div>
      <div className=" pt-8 ">
        <div className=" flex justify-between content-center mb-8">
          <p className="font-extrabold text-orange-600 text-2xl">
            User Profile
          </p>
        </div>
      </div>
      <div className="border border-solid p-4 rounded-lg flex">
        <div className="flex items-center">
          <img src={pfp} alt="" />
        </div>
        <div className="flex flex-col ml-8  w-full">
          <div className="flex mx-4 my-4 p-2 rounded items-center border border-solid">
            <p className="font-bold text-lg">Name:</p>
            <div className="flex w-full justify-end">
              <p className="font-light ml-[100px]">{customer[0].name}</p>
            </div>
          </div>
          <div className="flex mx-4 my-4 p-2 rounded items-center border border-solid">
            <p className="font-bold text-lg whitespace-nowrap">
              Date of Birth:
            </p>
            <div className="flex w-full justify-end">
              <p className="font-light ml-[100px]">{customer[0].dob}</p>
            </div>
          </div>
          <div className="flex mx-4 my-4 p-2 rounded items-center border border-solid">
            <p className="font-bold text-lg">Phone:</p>
            <div className="flex w-full justify-end">
              <p className="font-light ml-[100px]">{customer[0].phone}</p>
            </div>
          </div>
          <div className="flex mx-4 my-4 p-2 rounded items-center border border-solid">
            <p className="font-bold text-lg">Address:</p>
            <div className="flex w-full justify-end">
              <p className="font-light ml-[100px]">{customer[0].address}</p>
            </div>
          </div>
        </div>
      </div>
      {/* {isLoading ? <Loader /> : ""} */}
      <div className="mt-8">
        <p className="font-bold">Loans Applied</p>
        <div className="mt-4">
          {customerLoans.map((loan, index) => {
            if (isLoading) {
              return <Loader />;
            }
            return (
              <div className="bg-white rounded-xl mb-4 p-3" key={index}>
                <p className="font-bold">{loan.loanName}</p>
                <div className="flex content-center mt-1">
                  <p className="text-gray-500 text-xs">
                    Loan Purpose: {loan.loanPurpose}{" "}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;

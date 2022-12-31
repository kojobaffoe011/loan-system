import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerList from "../components/CustomerList";
import axios from "axios";
import back from "../assets/back.svg";
import { showErrorToast } from "../components/Toast";
import Loader from "../components/Loader";

const Customers = () => {
  const [lists, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomers = () => {
    return axios("https://buff-loans.herokuapp.com/customers");
  };

  useEffect(() => {
    fetchCustomers()
      .then(({ data }) => {
        setList(data);
        console.log(data);
      })
      .catch((error) => {
        showErrorToast("No Server Response");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (lists.length === 0) {
      return (
        <div className="flex justify-center mt-8 mx-auto">
          <div className="flex flex-col">
            <p className="font-semibold text-sm">
              {" "}
              No customers available, Please Register
            </p>
            <div>
              <Link to="/register">
                <div className="mt-8">
                  <button className="border rounded-lg w-full px-2 py-2 bg-orange-600 leading-tight hover:bg-orange-500">
                    <p className="font-bold text-sm text-gray-50">
                      Register Customer
                    </p>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return lists.map((list, index) => {
      return (
        <Link to={`/customer-profile/${list.id}/${list.idNumber}`} key={index}>
          <CustomerList {...list} key={index} />
        </Link>
      );
    });
  };

  return (
    <div>
      <div className="mt-8">
        <Link to={-1}>
          <img src={back} alt="" height="40" width="40" />
        </Link>
      </div>
      <div className=" pt-8 ">
        <div className=" flex justify-between content-center mb-8">
          <p className="font-extrabold text-orange-600 text-2xl">Buff Loans</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mx-auto">
          <p className="font-bold text-md mb-4">Customers</p>
        </div>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default Customers;

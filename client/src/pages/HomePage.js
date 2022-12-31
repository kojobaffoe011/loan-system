import React, { useEffect, useState } from "react";
import Loans from "../components/Loans";
import { Link } from "react-router-dom";
import axios from "axios";
import { showErrorToast } from "../components/Toast";
import Loader from "../components/Loader";

const fetchLoans = () => {
  return axios("https://buff-loans.herokuapp.com/loans");
};

const HomePage = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLoans()
      .then(({ data }) => {
        setLoans(data);
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
    return loans.map((loan, index) => {
      return <Loans {...loan} key={index} />;
    });
  };

  return (
    <div>
      <div className=" pt-8 ">
        <div className=" flex justify-between content-center mb-8">
          <p className="font-extrabold text-orange-600 text-2xl ">Buff Loans</p>

          <div className="flex justify-between items-center space-x-4">
            <Link to="/existing-customers">
              <button className="border rounded-lg w-full  bg-gray-50  px-2 py-2 leading-tight hover:bg-gray-100">
                <p className="font-bold text-sm text-gray-500">
                  Existing Customers
                </p>
              </button>
            </Link>
            <Link to="/register">
              <button className="border rounded-lg w-full px-2 py-2 bg-orange-600 leading-tight hover:bg-orange-500">
                <p className="font-bold text-sm text-gray-50">Register</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mx-auto">
          <p className="font-bold text-md mb-4">Available Loans</p>
        </div>
      </div>
      <div>
        <Link to="/apply">{renderContent()}</Link>
      </div>
    </div>
  );
};

export default HomePage;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import ApplyLoan from "../pages/ApplyLoan";
import CustomerProfile from "../pages/CustomerProfile";
import Customers from "../pages/Customers";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/existing-customers" element={<Customers />} />
          <Route
            path="/customer-profile/:ID/:IDNum"
            element={<CustomerProfile />}
          />
          <Route path="/apply" element={<ApplyLoan />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default AppRouter;

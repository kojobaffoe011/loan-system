import React from "react";
import { Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <div className="bg-orange-50 border border-solid">
      <div className="flex flex-col min-h-screen px-8 md:px-4  max-w-4xl mx-auto">
        <div className="flex flex-col ">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;

import React from "react";

const CustomerList = (props) => {
  return (
    <div className="bg-white rounded-xl mb-4 p-3">
      <p className="font-bold">{props.name}</p>
      <div className="flex content-center mt-1">
        <p className="text-gray-500 text-xs">
          {props.address} {"  "}
        </p>
      </div>
    </div>
  );
};

export default CustomerList;

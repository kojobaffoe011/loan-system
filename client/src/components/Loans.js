import React from "react";

const Loans = (props) => {
  return (
    <div className="bg-white rounded-xl mb-4 p-3">
      <p className="font-bold">{props.name}</p>
      <div className="flex content-center mt-1">
        <p className="text-gray-500 text-xs">
          GHc{props.amount} <span className="text-black text-md">· </span>
          {props.interest}% per annum
        </p>
      </div>
    </div>
  );
};

export default Loans;

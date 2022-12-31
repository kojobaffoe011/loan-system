import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div
        className="animate-ping inline-block w-8 h-8 bg-current rounded-full  text-blue-600"
        role="status"
      ></div>
      <div
        className="
      animate-ping inline-block w-8 h-8 bg-current rounded-full 
        text-purple-500
      "
        role="status"
      ></div>
      <div
        className="
      animate-ping inline-block w-8 h-8 bg-current rounded-full 
        text-green-500
      "
        role="status"
      ></div>
      <div
        className="animate-ping inline-block w-8 h-8 bg-current rounded-full  text-red-500"
        role="status"
      ></div>
      <div
        className="
      animate-ping inline-block w-8 h-8 bg-current rounded-full 
        text-yellow-500
      "
        role="status"
      ></div>
      <div
        className="animate-ping inline-block w-8 h-8 bg-current rounded-full text-blue-300"
        role="status"
      ></div>
      <div
        className="animate-ping inline-block w-8 h-8 bg-current rounded-full text-gray-300"
        role="status"
      ></div>
    </div>
  );
};

export default Loader;

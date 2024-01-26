import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* design a beautiful page not found page */}
      <p className="p-2 mt-10 text-red-400 font-bold ">
        The page you are looking for was not found!!!
      </p>
      <Link
        to="/dashboard"
        className="underline text-blue-500 hover:text-blue-600"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default PageNotFound;

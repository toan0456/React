import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div>
      <body className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-800">404</h1>
          <p className="text-2xl font-light text-gray-600 mt-4">
            Oops! Page not found
          </p>
          <p className="text-gray-500 mt-4 mb-8">
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>
          <Link
            to={"/"}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Go back to homepage
          </Link>
        </div>
      </body>
    </div>
  );
};

export default Notfound;

import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation(); 

  const getLinkClass = (path) =>
    location.pathname === path
      ? "bg-white text-black font-semibold px-4 py-2 rounded-md shadow-md" 
      : "text-white px-4 py-2 hover:bg-white hover:text-black rounded-md transition duration-300";

  return (
    <header className="p-4 bg-blue-600 text-center text-lg shadow-md">
      <nav className="flex justify-center space-x-6">
        <Link to="/" className={getLinkClass("/")}>Fill Form</Link>
        <Link to="/edit" className={getLinkClass("/edit")}>Edit Response</Link>
      </nav>
    </header>
  );
};

export default Header;

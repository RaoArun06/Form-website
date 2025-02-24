import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="p-4 bg-blue-600 text-white text-center ">
    <nav>
      <Link to="/" className="px-4">Home</Link>
      <Link to="/edit" className="px-4">Edit</Link>
    </nav>
  </header>
);

export default Header;

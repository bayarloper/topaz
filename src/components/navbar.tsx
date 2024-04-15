// components/navbar.js

import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="/" className="text-white font-bold text-xl">Your Logo</a>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
              {/* Add more navigation links as needed */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

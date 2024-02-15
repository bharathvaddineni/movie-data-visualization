/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router for navigation
import { Dropdown } from "flowbite-react";
import { IoMdMenu } from "react-icons/io";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="  bg-stone-800 border-b border-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex flex-row items-center">
          <p className="text-3xl font-semibold cursor-default mr-4 text-fuchsia-500">
          <Link to="/" className="hover:text-gray-200">
                Anime
              </Link>
          </p>
        </div>

        <div className=" text-white md:hidden">
          <Dropdown
            label=""
            className="rounded  bg-gradient-to-r from-teal-500 to-indigo-500 w-1/3 mr-2 focus:outline-none"
            dismissOnClick={false}
            renderTrigger={() => (
              <span >
               <IoMdMenu  className="text-3xl font-bold cursor-pointer" />
              </span>
            )}
          >
            <Dropdown.Item className="m-4 font-bold">
              <Link to="/" className="hover:text-gray-200">
                Home
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="m-4 font-bold">
              <Link to="/" className="hover:text-gray-200">
                Services
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="m-4 font-bold">
              <Link to="/about" className="hover:text-gray-200">
                About
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="m-4 font-bold">
              <Link to="/contact" className="hover:text-gray-200">
                Contact
              </Link>
            </Dropdown.Item>
          </Dropdown>
        </div>

        <div className="flex flex-row items-center justify-center hidden md:block">
          <nav className={`md:flex md:items-center`}>
            <ul className="md:flex md:space-x-8 text-white font-bold">
              <li>
                <Link to="/" className="hover:text-gray-200 text-cyan-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-gray-200 text-cyan-500">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-200 text-cyan-500">
                  Contact
                </Link>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

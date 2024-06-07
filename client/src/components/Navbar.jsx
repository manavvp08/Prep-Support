import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import defaultImage from "../assets/image.png";
import axios from "axios";
import "../styles/animateText.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  let location = useLocation();
  let navigate = useNavigate();
  const cookies = new Cookies();
  const ref = useRef();
  const imageRef = useRef();
  const [ProfileImage, setProfileImage] = useState("");
  const userName = cookies.get("name");

  useEffect(() => {
    const validate = cookies.get("token");
    setToken(validate);
  }, [token]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const logoutUtils = () => {
    cookies.remove("token");
    cookies.remove("isAdmin");
    cookies.remove("name");
    cookies.remove("email");
    cookies.remove("uid");
    cookies.remove("userImage");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const email = cookies.get("email");
    const setImage = async () => {
      if (email) {
        let user = await axios.post(
          `${import.meta.env.VITE_SERVER}/getUserDetails`,
          {
            method: "POST",
            body: { email: email },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (user.data.success) {
          const imagePath = user.data.data.image;
          // console.log(imagePath);
          if (imagePath) {
            let imageUrl = await fetch(
              `${import.meta.env.VITE_SERVER}/send-profile-image/${imagePath}`
            );
            imageUrl = await imageUrl.json();

            if (imageRef.current && imageRef.current.src !== undefined) {
              imageRef.current.src =
                "data:image/jpg;base64," + imageUrl.imagePath;
              setProfileImage("data:image/jpg;base64," + imageUrl.imagePath);
            }
          }
        }
      }
    };
    setImage();
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow fixed w-full top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            PrepSupport
          </span>
        </Link>

        {/* Buttons for Small Screens */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
          <div>
            {!token && (
              <Link
                className={`flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 ${
                  location.pathname === "/login" ||
                  location.pathname === "/signup"
                    ? "hidden"
                    : ""
                }`}
                to="/login"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
                Log in
              </Link>
            )}
            {/* {token && (
              <button
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 none hidden md:block lg:block"
                onClick={() => logoutUtils()}
              >
                Log out
              </button>
            )} */}

            {token && (
              <div className="hidden justify-center items-center flex-wrap  md:hidden lg:flex">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Profile image"
                        src={ProfileImage == "" ? defaultImage : ProfileImage}
                        ref={imageRef}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      {token && (
                        <Link className="justify-between" to="/profile">
                          Profile
                        </Link>
                      )}
                    </li>
                    {token && (
                      <li>
                        <button onClick={() => logoutUtils()}>Logout</button>
                      </li>
                    )}
                  </ul>
                </div>
                <span className="font-bold bg-gradient-to-r from-red-700 via-blue-700 to-green-900 text-transparent bg-clip-text animate-gradient flex justify-center items-center text-center">
                  {userName && userName.length > 20
                    ? userName.slice(0, 20) + "..."
                    : userName}
                </span>
              </div>
            )}
            <button
              ref={ref}
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
              id="navbar-toggle"
              onClick={handleToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Navigation Links for Large Screens */}
        <div
          className={`items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "hidden" : "flex"
          }`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/home"
                className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/questions"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Questions
              </Link>
            </li>
            <li>
              <Link
                to="/form"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Experience Sharing
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Navigation Links for Small Screens */}
        <div
          className={`items-center justify-between w-full md:hidden ${
            isOpen ? "flex" : "hidden"
          }`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium mt-4 border border-gray-100 rounded-lg bg-gray-50 space-y-2 w-full ">
            <li>
              <Link
                to="/home"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/questions"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
              >
                Questions
              </Link>
            </li>
            <li>
              <Link
                to="/form"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
              >
                Experience Sharing
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
              >
                Contact
              </Link>
            </li>
            <li>
              {!token && (
                <Link
                  className={`flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 ml-3 mb-2 ${
                    location.pathname === "/login" ||
                    location.pathname === "/signup"
                      ? "hidden"
                      : ""
                  }`}
                  to="/login"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                  Log in
                </Link>
              )}
              {token && (
                <div className="flex flex-wrap">
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img
                          alt="Profile image"
                          src={ProfileImage == "" ? defaultImage : ProfileImage}
                          ref={imageRef}
                        />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm left-1 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        {token && (
                          <Link className="justify-between" to="/profile">
                            Profile
                          </Link>
                        )}
                      </li>
                      {token && (
                        <li>
                          <button onClick={() => logoutUtils()}>Logout</button>
                        </li>
                      )}
                    </ul>
                  </div>
                  <span className="font-bold bg-gradient-to-r from-red-700 via-blue-700 to-green-900 text-transparent bg-clip-text animate-gradient flex justify-center items-center text-center">
                    {userName && userName.length > 20
                      ? userName.slice(0, 20) + "..."
                      : userName}
                  </span>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

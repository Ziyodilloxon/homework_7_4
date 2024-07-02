import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../firebase/firebaseConfig";
import { BiSun, BiMoon } from "react-icons/bi";
import "./Navbar.css";

function Navbar() {
  const { user } = useSelector((state) => state.user);
  const [isDarkMode, setIsDarkMode] = useState(false);
  console.log(user);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const signOutFunc = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="bg-sky-300 dark:bg-gray-800 mb-8 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-pink-600 dark:text-pink-400 animate-logo"
            >
              MyTodo
            </Link>
          </div>
          <div className="hidden md:flex flex-1 justify-center space-x-6">
            <NavLink
              to="/"
              exact
              className="nav-link"
              activeClassName="nav-link-active"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="nav-link"
              activeClassName="nav-link-active"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="nav-link"
              activeClassName="nav-link-active"
            >
              Contact
            </NavLink>
          </div>
          <div className="flex items-center">
            {user && (
              <div className="flex flex-col items-center mr-3">
                {" "}
                <p className="mr-3 font-semibold text-xl text-gray-800 dark:text-gray-300">
                  {user.displayName}
                </p>
                <p className="font-light text-ms text-gray-900 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            )}
            {user && (
              <div className="ml-3 relative">
                <div>
                  <button
                    className="bg-gray-800 dark:bg-gray-600 flex text-sm rounded-full focus:outline-none transition-transform duration-300 hover:scale-110"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={signOutFunc}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="avatar">
                      <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                        {user && (
                          <img src={user.photoURL} alt={user.displayName} />
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 ml-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 focus:outline-none transform transition-transform duration-300 hover:scale-110"
            >
              {isDarkMode ? (
                <BiSun className="h-6 w-6" />
              ) : (
                <BiMoon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import { Link, NavLink } from "react-router-dom";
import NavLinks from "./NavLinks"; // Agar NavLinks komponenti mavjud bo'lsa
import { Home, About, Contact } from "../pages";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../firebase/firebaseConfig";

function Navbar() {
  const { user } = useSelector((state) => state.user);

  const signOutFunc = () => {
    signOut(auth)
      .then(() => {
        toast.success("sign out");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div className="bg-sky-300 mb-8">
      <div className="navbar site-container flex">
        <div className="navbar-start">
          <Link className="btn btn-secondary font-bold text-2xl" to="/">
            MyTodo
          </Link>
        </div>
        <ul className="menu menu-horizontal gap-4">
          <li>
            <Link
              className="border-b-2 border-r-2 font-bold text2xl"
              exact
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="border-b-2 border-r-2 pb-3 font-bold text2xl"
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="border-b-2 border-r-2 pb-3 font-bold text2xl"
              to="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>
        <div>
          <div className="navbar-end flex gap-3 items-center ml-20">
            {user && <p className="mr-3 font-semibold text-xl">{user.displayName}</p>}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={`${user.displayName ?? "user"} image`}
                    src={user.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={signOutFunc} className="btn btn-sm">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

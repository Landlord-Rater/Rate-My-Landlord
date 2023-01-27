import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// use hook to import context
import Logo from "../assets/Logo.png";
import Person2Icon from "@mui/icons-material/Person2";

const Navbar = ({ isLoggedIn }) => {
  const authBtnProps = {
    text: isLoggedIn ? "Log Out" : "Log In",
    route: isLoggedIn ? "/logout" : "/login",
  };

  return (
    <header className="">
      <div className="bg-primary">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center sm:space-x-10 space-x-2">
              <img className="h-12" src={Logo} alt="Logo" />

              <Link to="/">
                <h1 className="site-title text-white py-2 hover:text-secondary font-semibold">
                  Rate My Landlord
                </h1>
              </Link>
            </div>
            <div className="flex items-center sm:space-x-10 space-x-2">
              {isLoggedIn ? (
                <Link to="/profile">
                  <h3 className="text-gray-600 py-2 hover:text-secondary font-semibold">
                    <Person2Icon />
                  </h3>
                </Link>
              ) : (
                ""
              )}
              <Link to="/">
                <div className="nav-link text-white py-2 hover:text-secondary font-semibold">
                  Home
                </div>
              </Link>
              <Link
                to={`${authBtnProps.route}`}
                className="text-gray-600  hover:text-dark-purple font-semibold"
              >
                <button
                  type="button"
                  className=" bg-grey-subtle text-primary p-2 rounded sm:text-1xl font-semibold hover:bg-secondary"
                >{`${authBtnProps.text}`}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

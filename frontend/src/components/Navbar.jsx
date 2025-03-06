import React, { useContext } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "underline" : "";
  };

  return (
    <div className={`p-4 flex justify-between items-center ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        HireTheDev
      </div>
      <div className="flex space-x-4">
        <div className={`cursor-pointer ${getNavLinkClass("/")}`} onClick={() => navigate("/")}>
          Home
        </div>
        <div className={`cursor-pointer ${getNavLinkClass("/roleselector")}`} onClick={() => navigate("/roleselector")}>
          Role Selector
        </div>
        <div className={`cursor-pointer ${getNavLinkClass("/employeeform")}`} onClick={() => navigate("/employeeform")}>
          Employee Form
        </div>
        <div className={`cursor-pointer ${getNavLinkClass("/employerform")}`} onClick={() => navigate("/employerform")}>
          Employer Form
        </div>
        <div className={`cursor-pointer ${getNavLinkClass("/jobslist")}`} onClick={() => navigate("/jobslist")}>
          Jobs List
        </div>
        <div className={`cursor-pointer ${getNavLinkClass("/developerlist")}`} onClick={() => navigate("/developerlist")}>
          Developer List
        </div>
        <div className={`cursor-pointer ${getNavLinkClass("/profile")}`} onClick={() => navigate("/profile")}>
          Profile
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="cursor-pointer" onClick={() => navigate("/login")}>
          {location.pathname === "/login" ? "" : "Sign in"}
        </div>
        <DarkModeSwitch
          checked={theme !== "light"}
          onChange={toggleTheme}
          size={28}
        />
      </div>
    </div>
  );
};

export default Navbar;

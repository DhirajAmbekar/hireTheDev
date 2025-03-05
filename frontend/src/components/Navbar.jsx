import React, { useContext } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <div className="nav_container">
      <div className="nav_section">
        <div className="nav_section_logo">HireTheDev</div>

        <div
          className="nav_section_sign"
          onClick={() => {
            navigate("/login");
          }}
        >
          {location.pathname === "/login" ? "" : "Sign in"}
        </div>
        <div className="nav_section_switch">
          <DarkModeSwitch
            checked={theme !== "light"}
            onChange={toggleTheme}
            size={28}
          />
        </div>

        <div className="nav_section_switcher">Employee</div>
      </div>
    </div>
  );
};

export default Navbar;

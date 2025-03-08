import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";

import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import RoleSelector from "./pages/RoleSelector";
import { Employee } from "./pages/Form/Employee";
import { Employer } from "./pages/Form/Employer";
import { JobList } from "./pages/JobList";
import { DeveloperList } from "./pages/DeveloperList";
import { Profile } from "./pages/Profile";
// import Navbar from "./components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUser } from "./features/userSlice";

const Layout = () => {
  // const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector((state) => state.auth);
  // const user = useSelector((state) => state.user);
  // console.log(isAuthenticated, user);

  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, [dispatch]);
  const location = useLocation();

  const routes = [
    {
      path: "",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/roleselector",
      element: <RoleSelector />,
    },
    {
      path: "/employeeform",
      element: <Employee />,
    },
    {
      path: "/employerform",
      element: <Employer />,
    },
    {
      path: "/jobslist",
      element: <JobList />,
    },
    {
      path: "/developerlist",
      element: <DeveloperList />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },

    {
      path: "/*",
      element: <Error />,
    },
  ];
  return (
    <div className="layout">
      {[
        "/login",
        "/employerform",
        "/employeeform",
        "/roleselector",
        "/login",
      ].includes(location.pathname) ? (
        ""
      ) : (
        <Navbar />
      )}
      {useRoutes(routes)}
    </div>
  );
};

export default Layout;

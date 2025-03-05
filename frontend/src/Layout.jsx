import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";

import Login from "./pages/Login";
import Navbar from "./components/Navbar";
// import RoleSelector from "./pages/RoleSelector";
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
    // {
    //   path: "/roleselector",
    //   element: <RoleSelector />,
    // },

    {
      path: "/*",
      element: <Error />,
    },
  ];
  return (
    <div className="layout">
      {location.pathname === "/login" ? "" : <Navbar />}
      {useRoutes(routes)}
    </div>
  );
};

export default Layout;

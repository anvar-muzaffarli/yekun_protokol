import React from "react";
import { Route } from "react-router-dom";

import Login from "../auth/Login";
import Register from "../auth/Register";


import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";

import Home from "../Home";

const userRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} /> */}


    </>
  );
};

export default userRoutes;
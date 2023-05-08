import React from "react";
import { Route, Routes } from "react-router-dom";
import Logout from "../Logout/Logout";
import Sidebar from "../Sidebar/Sidebar";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default Router;

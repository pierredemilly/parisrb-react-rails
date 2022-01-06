import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Photos from "./Photos";
import Profile from "./Profile";
import ReactForm from "./ReactForm";

export default function Router() {
  return (
    <BrowserRouter>
      <div className="flex w-full px-4 space-x-4 mb-6">
        <NavLink to="/" className="tab">My Photos</NavLink>
        <NavLink to="/profile" className="tab">My Profile</NavLink>
      </div>
      <Routes>
        <Route path="/" element={<Photos />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}



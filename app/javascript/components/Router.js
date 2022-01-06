import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Photos from "./Photos";
import Photo from "./Photo";
import Profile from "./Profile";

export default function Router() {
  return (
    <BrowserRouter>
      <div className="flex w-full px-4 space-x-4 mb-6">
        <NavLink to="/photos" className="tab">My Photos</NavLink>
        <NavLink to="/profile" className="tab">My Profile</NavLink>
      </div>
      <Routes>
        <Route path="/" element={<Photos />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/photos/:photoId" element={<Photo />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}



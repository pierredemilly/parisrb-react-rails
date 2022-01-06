import React, { useState, useEffect } from "react";
import axios from "axios";

import { UserContext } from "../contexts/user-context";
import { PhotosContext } from "../contexts/photos-context";

import Router from "./Router";
import Header from "./Header";

export default function App() {
  // User data

  const [user, setUser] = useState({});

  const loadUser = () => {
    axios.get("/api/user").then((res) => setUser(res.data));
  };

  // load user from API on component initialization
  useEffect(loadUser, []);

  const userValues = {
    user,
    setUser,
    loadUser,
  };

  // Photos data

  const [photos, setPhotos] = useState([]);

  const loadPhotos = () => {
    axios.get("/api/photos").then((res) => setPhotos(res.data));
  };

  // load photos from API on component initialization
  useEffect(loadPhotos, []);

  const photosValues = {
    photos,
    setPhotos,
    loadPhotos,
  };

  return (
    <UserContext.Provider value={userValues}>
      <PhotosContext.Provider value={photosValues}>
        <Header />
        <Router />
      </PhotosContext.Provider>
    </UserContext.Provider>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";

import { UserContext } from "../contexts/user-context";

import Router from "./Router";
import Header from "./Header";

export default function App() {
  const [user, setUser] = useState({});

  const loadUser = () => {
    axios.get("/api/user").then((res) => setUser(res.data));
  };

  const userValues = {
    user,
    setUser,
    loadUser,
  };

  // load user from API on component initialization
  useEffect(loadUser, []);

  return (
    <UserContext.Provider value={userValues}>
      <Header />
      <Router />
    </UserContext.Provider>
  );
}

import React, { useState, useEffect } from "react";

export default function App() {

  const [user, setUser] = useState({});

  const loadUser = () => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  useEffect(loadUser, []);

  return (
    <div className="m-6 space-y-6">
      <h1 className="text-3xl font-bold">Hello {user?.first_name}</h1>

      <button
        className="bg-blue-600 text-white rounded px-4 py-2"
        onClick={loadUser}
      >
        Send request
      </button>
    </div>
  );
}

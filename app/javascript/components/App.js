import React, { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "./TextInput";

export default function App() {
  const [user, setUser] = useState({});

  const loadUser = () => {
    axios.get("/api/user").then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  };

  useEffect(loadUser, []);

  const [errors, setErrors] = useState({});

  const handleSaveUser = (evt) => {
    evt.preventDefault();

    axios
      .patch("/api/user", new FormData(evt.target), {
        headers: {
          "X-CSRF-Token": document.querySelector("[name=csrf-token]").content,
        },
      })
      .then((res) => {
        setUser(res.data);
        setErrors({});
      })
      .catch((error) => setErrors(error.response.data));
  };

  return (
    <div className="m-6 space-y-6">
      <div className="flex items-center space-x-4">
        {user.profile_picture && (
          <img
            src={user.profile_picture}
            className="w-12 h-12 rounded-full border shadow object-cover"
          />
        )}
        <h1 className="text-3xl font-bold">
          Hello {user?.first_name} {user?.last_name}
        </h1>
      </div>

      <form className="space-y-4" onSubmit={handleSaveUser}>
        <TextInput
          name="email"
          label="Email"
          defaultValue={user?.email}
          errors={errors?.email}
        />
        <TextInput
          name="first_name"
          label="First name"
          defaultValue={user?.first_name}
          errors={errors?.first_name}
        />
        <TextInput
          name="last_name"
          label="Last name"
          defaultValue={user?.last_name}
          errors={errors?.last_name}
        />

        <div className="field">
          <label htmlFor="picture">Profile picture</label>
          <br />
          <input type="file" id="picture" name="picture" accept="image/*" />
        </div>

        <input type="submit" value="Save changes" className="button" />
      </form>

      <hr />

      <a className="button danger cursor-pointer" href="/sign_out">
        Sign out
      </a>
    </div>
  );
}

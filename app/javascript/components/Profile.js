import React, { useContext, useState } from 'react'
import axios from 'axios';

import { UserContext } from '../contexts/user-context';

import TextInput from './TextInput';

export default function Profile(props) {

  const {user, setUser} = useContext(UserContext);

  // form uploading state
  const [loading, setLoading] = useState(false)
  
  // upload progress from 0 to 1
  const [progress, setProgress] = useState(null);

  // key/value object of validation errors from backend
  const [errors, setErrors] = useState({});

  // form submission to user api
  const handleSaveUser = (evt) => {
    evt.preventDefault();

    setLoading(true);

    axios
      .patch("/api/user", new FormData(evt.target), {
        headers: {
          "X-CSRF-Token": document.querySelector("[name=csrf-token]").content,
        },
        onUploadProgress: (evt) => {
          if (evt.lengthComputable) {
            setProgress(evt.loaded / evt.total);
          }
        }
      })
      .then((res) => {
        setUser(res.data);
        setErrors({});
      })
      .catch((error) => setErrors(error.response.data))
      .then(() => setLoading(false));
  };

  return (

    <form className="space-y-4 px-4" onSubmit={handleSaveUser}>
      <TextInput
        name="email"
        label="Email"
        defaultValue={user?.email}
        errors={errors?.email}
        disabled={loading}
      />
      <TextInput
        name="first_name"
        label="First name"
        defaultValue={user?.first_name}
        errors={errors?.first_name}
        disabled={loading}
      />
      <TextInput
        name="last_name"
        label="Last name"
        defaultValue={user?.last_name}
        errors={errors?.last_name}
        disabled={loading}
      />

      <div className="field">
        <label htmlFor="picture">Profile picture</label>
        <br />
        <input type="file" id="picture" name="picture" accept="image/*" disabled={loading} />
      </div>

      {progress > 0 && progress < 1 && <progress max="1" value={progress} className="block" />}

      <input type="submit" value="Save changes" className="button" disabled={loading} />
    </form>
  )
}

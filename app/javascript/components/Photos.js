import React, { useState, useContext } from "react";
import axios from "axios";

import { PhotosContext } from "../contexts/photos-context";

export default function Photos() {
  const { photos, setPhotos } = useContext(PhotosContext);

  // form uploading state
  const [loading, setLoading] = useState(false);

  // upload progress from 0 to 1
  const [progress, setProgress] = useState(null);

  // key/value object of validation errors from backend
  const [errors, setErrors] = useState({});

  const uploadPhoto = (evt) => {
    evt.preventDefault();

    setLoading(true);

    axios
      .post("/api/photos", new FormData(evt.target), {
        headers: {
          "X-CSRF-Token": document.querySelector("[name=csrf-token]").content,
        },
        onUploadProgress: (evt) => {
          if (evt.lengthComputable) {
            setProgress(evt.loaded / evt.total);
          }
        },
      })
      .then((res) => {
        setPhotos(res.data);
        setErrors({});
      })
      .catch((error) => setErrors(error.response.data))
      .then(() => setLoading(false));
  };

  return (
    <div className="px-4 py-8">
      <div className="flex flex-wrap gap-4">
        {photos.map((photo) => (
          <img
            src={photo.url}
            className="w-64 h-64 w- object-cover rounded-3xl border"
          />
        ))}
      </div>

      <hr className="my-12" />

      <form
        className="flex flex-col items-start space-y-6"
        onSubmit={uploadPhoto}
      >
        <h2 className="text-lg font-medium">Upload a photo</h2>

        <div>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            disabled={loading}
          />

          {errors.file && (
            <div className="text-red-900 text-sm italic">
              {errors.file.join(" ")}
            </div>
          )}
        </div>

        {progress > 0 && progress < 1 && (
          <progress max="1" value={progress} className="block" />
        )}

        <input
          type="submit"
          value="Upload photo"
          disabled={loading}
          className="button"
        />
      </form>
    </div>
  );
}

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

  const deletePhoto = (photoId) => {
    axios
      .delete(`/api/photos/${photoId}`, {
        headers: {
          "X-CSRF-Token": document.querySelector("[name=csrf-token]").content,
        },
      })
      .then((res) => setPhotos(res.data));
  };

  return (
    <div className="px-4 py-8">
      <div className="flex flex-wrap gap-4">
        {photos.map((photo) => (
          <div className="relative group">
            <img
              src={photo.url}
              className="w-64 h-64 w- object-cover rounded-3xl border"
            />
            <div
              className="absolute top-2 right-2 rounded-full p-1.5 bg-white border shadow opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
              onClick={() => deletePhoto(photo.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
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

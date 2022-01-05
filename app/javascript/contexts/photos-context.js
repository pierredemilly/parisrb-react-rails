import { createContext } from "react";

export const PhotosContext = createContext({
  photos: null,
  setPhotos: () => {},
  loadPhotos: () => {},
});

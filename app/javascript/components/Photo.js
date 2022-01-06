import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'

import { PhotosContext } from '../contexts/photos-context';

export default function Photo() {

  const { photoId } = useParams();
  const { photos } = useContext(PhotosContext);

  const photo = photos.find(photo => photo.id == photoId);

  return (
    <div className="p-6">

      {photo && <img src={ photo.url } className="max-w-3xl" />}
      
    </div>
  )
}

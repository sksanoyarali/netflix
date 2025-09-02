import React from 'react'
import { IMAGE_CDN } from '../utils/constants'
const MovieCard = ({ posterPath }) => {
  if (!posterPath) return
  return (
    <div className="w-48 pr-4">
      <img src={IMAGE_CDN + posterPath} alt="Movie card" />
    </div>
  )
}

export default MovieCard

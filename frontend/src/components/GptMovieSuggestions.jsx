import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt)

  if (!movieNames || !movieResults) return null

  return (
    <div className="p-4 m-4 bg-black/80 text-white ">
      {movieNames &&
        movieNames.map((movieName, ind) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[ind] || []} // prevent undefined
          />
        ))}
    </div>
  )
}

export default GptMovieSuggestions

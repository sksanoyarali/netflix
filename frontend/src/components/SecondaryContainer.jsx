import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies)
  return (
    movies && (
      <div className="bg-black">
        <div className="-mt-32 relative z-10 p-12">
          <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
          <MovieList title="Top Rated" movies={movies.topRatedMovies} />
          <MovieList title="Popular" movies={movies.popularMovies} />
          <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
          <MovieList title="Trending Movies" movies={movies.upcomingMovies} />
        </div>
      </div>
    )
  )
}

export default SecondaryContainer

import { useDispatch, useSelector } from 'react-redux'
import { apiOptions } from '../utils/constants'
import { addTrailerVideo } from '../utils/movieSlice'
import { useEffect } from 'react'

const useTrailerVideo = (movieId) => {
  const dispatch = useDispatch()
  const trailerVideo = useSelector((store) => store.movies.trailerVideo)
  const getMovieVideos = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/' + movieId + '/videos',
      apiOptions
    )
    const json = await data.json()
    const trailers = json.results.filter((video) => video.type === 'Trailer')
    const trailer = trailers.length ? trailers[0] : json.results[0]
    dispatch(addTrailerVideo(trailer))
  }
  useEffect(() => {
    if (!trailerVideo) {
      getMovieVideos()
    }
  }, [])
}
export default useTrailerVideo

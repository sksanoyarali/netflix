import { useDispatch } from 'react-redux'
import { apiOptions } from '../utils/constants'
import { useEffect } from 'react'
import { addNowPlayingMovies } from '../utils/movieSlice'

const useNowPlayingMovies = () => {
  const dispatch = useDispatch()
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?&page=1',
      apiOptions
    )
    const json = await data.json()
    dispatch(addNowPlayingMovies(json?.results))
  }
  useEffect(() => {
    getNowPlayingMovies()
  }, [])
}
export default useNowPlayingMovies

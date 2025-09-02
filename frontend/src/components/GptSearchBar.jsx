import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from '../utils/languageConstant'
import { apiOptions } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang)
  const searchText = useRef()
  const dispatch = useDispatch()
  const searchMovieInTmdb = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=' +
        movie +
        '&include_adult=false&language=en-US&page=1',
      apiOptions
    )
    const json = await data.json()
    return json.results
  }

  const handleGptSearchClick = async () => {
    const postData = {
      prompt: searchText.current.value,
    }
    const res = await fetch(' http://localhost:3000/generate', {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Tell server we're sending JSON
      },
      body: JSON.stringify(postData),
    })
    const data = await res.json()
    const gptMovies = data.generated_text?.split(',')
    //this will return 5 promises
    const promiseArray = gptMovies.map((movie) => searchMovieInTmdb(movie))

    const tmdbResults = await Promise.all(promiseArray)
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    )
  }

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className=" bg-black w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          placeholder={lang[langKey].gptSearchPlaceHolder}
          className="p-4 m-4 bg-white col-span-9"
        />
        <button
          onClick={handleGptSearchClick}
          className="py-2 px-2 m-4 bg-red-500 text-white rounded-lg col-span-3"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar

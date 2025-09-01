import React from 'react'
import { useSelector } from 'react-redux'
import lang from '../utils/languageConstant'

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang)
  return (
    <div className="pt-[10%] flex justify-center">
      <form className=" bg-black w-1/2 grid grid-cols-12">
        <input
          type="text"
          placeholder={lang[langKey].gptSearchPlaceHolder}
          className="p-4 m-4 bg-white col-span-9"
        />
        <button className="py-2 px-2 m-4 bg-red-500 text-white rounded-lg col-span-3">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar

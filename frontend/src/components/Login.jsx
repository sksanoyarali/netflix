import React, { useState } from 'react'
import Header from './Header'
import { BG_URL } from '../utils/constants'

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true)
  const toggleSignInform = () => {
    setIsSignIn(!isSignIn)
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BG_URL} alt="bg-image" />
      </div>
      <form className="w-3/12 absolute p-12 bg-black/80 my-36 mx-auto  right-0 left-0 text-white">
        <h1 className="font-bold text-3xl py-4 ">
          {isSignIn ? 'Sign In' : 'Sign UP'}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Username"
            className="p-2 my-4 w-full bg-gray-700 rounded-lg border-none outline-none"
          />
        )}
        <input
          type="text"
          placeholder="email Address"
          className="p-2 my-4 w-full bg-gray-700 rounded-lg border-none outline-none"
        />
        <input
          type="text"
          placeholder="email Address"
          className="p-2 my-4 w-full bg-gray-700 rounded-lg border-none outline-none"
        />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </button>
        <p className="p-2 font-bold cursor-pointer" onClick={toggleSignInform}>
          {isSignIn
            ? 'New to netflix ? sign up now'
            : 'Already Have Account?Sign In'}
        </p>
      </form>
    </div>
  )
}

export default Login

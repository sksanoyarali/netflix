import React, { useRef, useState } from 'react'
import Header from './Header'
import { BG_URL } from '../utils/constants'
import { checkValidData } from '../utils/validate'
import { auth } from '../utils/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Login = () => {
  const dispatch = useDispatch()
  const [isSignIn, setIsSignIn] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null)
  const toggleSignInform = () => {
    setIsSignIn(!isSignIn)
  }
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(message)
    if (message) return
    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              )
            })
            .catch((error) => {
              setErrorMessage(error.message)
            })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setErrorMessage(errorCode + errorMessage)
        })
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
        })
        .catch((error) => {
          setErrorMessage('Incorrect credential')
        })
    }
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BG_URL} alt="bg-image" />
      </div>
      <form
        className="w-3/12 absolute p-12 bg-black/80 my-36 mx-auto  right-0 left-0 text-white"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-4 ">
          {isSignIn ? 'Sign In' : 'Sign UP'}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Username"
            className="p-2 my-4 w-full bg-gray-700 rounded-lg border-none outline-none"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="email Address"
          className="p-2 my-4 w-full bg-gray-700 rounded-lg border-none outline-none"
        />
        <input
          type="text"
          ref={password}
          placeholder="Enter Password"
          className="p-2 my-4 w-full bg-gray-700 rounded-lg border-none outline-none"
        />
        {errorMessage && (
          <p className="font-bold text-red-500 text-lg p-2">{errorMessage}</p>
        )}
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
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

import React, { useEffect } from 'react'
import { LOGO_URL } from '../utils/constants'
import { auth } from '../utils/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

const Header = () => {
  const user = useSelector((store) => store.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        navigate('/error')
      })
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
        navigate('/browse')
      } else {
        dispatch(removeUser())
        navigate('/')
      }
    })
    //unsubcribe called when component unmounts
    return () => unsubscribe()
  }, [])
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO_URL} alt="Logo" />
      {user && (
        <div className="flex">
          <button
            className="p-2 mt-1 bg-red-500 text-white text-xl rounded-xl"
            onClick={handleSignOut}
          >
            Sign out
          </button>
          <h1 className="p-3 mt-1 ml-1 bg-red-500 text-white text-xl rounded-xl">
            {user.displayName}
          </h1>
        </div>
      )}
    </div>
  )
}

export default Header

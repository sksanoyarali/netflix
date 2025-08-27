// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAPqc5_TiefsuOwZB_QZUYfIPawyihAIXA',
  authDomain: 'netflix-ff690.firebaseapp.com',
  projectId: 'netflix-ff690',
  storageBucket: 'netflix-ff690.firebasestorage.app',
  messagingSenderId: '343522343158',
  appId: '1:343522343158:web:57efd53b0cfa1a973014d7',
  measurementId: 'G-1ETQNPE0JH',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth()

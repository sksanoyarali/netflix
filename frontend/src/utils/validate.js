const checkValidData = (email, password) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  )
  if (!isEmailValid) {
    return 'Email id is Not valid'
  }
  if (password.length < 6) return 'Password must be atleast 6 character'
  return null
}
export { checkValidData }

import React, { useState } from 'react'
import supabase from '../config/supabaseClient'
import { useAuthContext } from '../hooks/useAuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const handleLogin = async (e) => {
    e.preventDefault()

    setLoading(true)
    const { user, error } = await supabase.auth.signIn({ email, password })
    if (user) {
      dispatch({ type: "LOGIN", payload: user }) // dispatch LOGIN action
    }
    if (error) {
      console.log('error:', error)
      setError(error.message)
    }
    setLoading(false)

    setEmail('')
    setPassword('')
  }

  return (
    <form
      style={{ marginTop: '2rem' }}
      onSubmit={handleLogin}
    >
      <h2>login</h2>

      <label htmlFor="email">email:</label>
      <input
        type="email"
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="email">password:</label>
      <input
        type="password"
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {!loading && <button type='submit'>login</button>}
      {loading && <button disabled>loading...</button>}
      {error && <p>{error}</p>}
    </form>
  )
}

export default Login
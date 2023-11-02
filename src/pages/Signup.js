import React, { useState } from 'react'
import supabase from '../config/supabaseClient'
import { useAuthContext } from '../hooks/useAuthContext'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const handleSignup = async (e) => {
    e.preventDefault()

    setLoading(true)
    let { user, error } = await supabase.auth.signUp({ email, password })
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
      onSubmit={handleSignup}
    >
      <h2>sign up</h2>

      <label htmlFor="email">email:</label>
      <input
        type="email"
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />

      <label htmlFor="email">password:</label>
      <input
        type="password"
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />

      <button type='submit' disabled={loading}>
        {loading ? 'loading...' : 'sign up'}
      </button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default Signup
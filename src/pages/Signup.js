import React, { useState } from 'react'
import supabase from '../config/supabaseClient'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    let { user, error } = await supabase.auth.signUp({ email, password })
    if (user) {
      console.log('signed up user:', user)
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
      onSubmit={handleSubmit}
    >
      <h2>sign up</h2>

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

      {!loading && <button type='submit'>sign up</button>}
      {loading && <button disabled>loading...</button>}
      {error && <p>{error}</p>}
    </form>
  )
}

export default Signup
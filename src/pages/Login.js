import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password)

    setEmail('')
    setPassword('')
  }

  return (
    <form
      style={{ marginTop: '2rem' }}
      onSubmit={handleSubmit}
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

      <button type='submit'>login</button>
    </form>
  )
}

export default Login
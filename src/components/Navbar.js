import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <h1>Supa Smoothies</h1>
      <Link to="/">Home</Link>
      <Link to="/create">Create New Smoothie</Link>
      <Link to='/login'>Login</Link>
    </nav>
  )
}

export default Navbar
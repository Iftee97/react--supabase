import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"
import supabase from '../config/supabaseClient'

const Navbar = () => {
  const { user, dispatch } = useAuthContext()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    dispatch({ type: "LOGOUT" }) // dispatch LOGOUT action
    console.log("logged out")
  }

  return (
    <nav>
      <ul>
        <li>
          <h1 className='title'>
            <Link to="/">Supa Smoothies</Link>
          </h1>
        </li>
        {user && <li>
          <Link to="/create">Create New Smoothie</Link>
        </li>}
      </ul>
      {!user && (
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/signup'>Sign up</Link>
          </li>
        </ul>
      )}
      {user && (
        <ul className='ifUser'>
          <li>
            user: <strong>{user.email}</strong>
          </li>
          <li onClick={handleLogout}>logout</li>
        </ul>
      )}
    </nav >
  )
}

export default Navbar
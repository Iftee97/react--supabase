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
      <h1>Supa Smoothies</h1>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create New Smoothie</Link>
          </li>
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
      </div>
    </nav >
  )
}

export default Navbar
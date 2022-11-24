import { createContext, useReducer, useEffect } from 'react'
import supabase from '../config/supabaseClient'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null
      }

    case 'AUTH_IS_READY':
      return {
        user: action.payload,
        authIsReady: true
      }

    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  })

  // the following code handles weird behaviors on refresh
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      dispatch({ type: 'AUTH_IS_READY', payload: session.user })
    })
  }, [])

  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
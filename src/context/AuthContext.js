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
    authIsReady: false,
    session: null
  })

  // THIS METHOD OF SETTING USER IS ONLY APPLICABLE FOR SUPABASE V1
  useEffect(() => {
    const session = supabase.auth.session()
    dispatch({ type: 'AUTH_IS_READY', payload: session?.user ?? null })
  }, [])

  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
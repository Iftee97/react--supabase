import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// pages & components
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

export default function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/login" />}
            />
            <Route
              path="/:id"
              element={user ? <Update /> : <Navigate to="/login" />}
            />
            <Route
              path='/login'
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path='/signup'
              element={user ? <Navigate to="/" /> : <Signup />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  )
}
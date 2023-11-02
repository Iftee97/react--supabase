import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      if (!title || !method || !rating) {
        setFormError("Please fill in all the fields")
        return
      }

      const { data, error } = await supabase
        .from('smoothies')
        .insert([{ title, method, rating }]) // inserting (adding) new row (data) to smoothies table

      if (error) {
        throw Error
        console.log(error)
        setFormError('Please fill in all the fields correctly.')
      }
      if (data) {
        console.log(data)
        setFormError(null)
        navigate('/') // redirect to home page
      }
    } catch (error) {
      setLoading(false)
      console.log('Error: >>>>>>', error)
    } finally {
      setLoading(true)
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          disabled={loading}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          disabled={loading}
        />

        {formError && <p className="error">{formError}</p>}
        <button disabled={loading}>
          {loading ? 'creating smoothie' : 'Create Smoothie Recipe'}
        </button>
      </form>
    </div>
  )
}

export default Create
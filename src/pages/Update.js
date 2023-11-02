import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    const fetchSmoothie = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("smoothies")
          .select()
          .eq("id", id)
          .single() // fetching a single row from the 'smoothies' table

        if (error) {
          throw Error
          console.log(error)
          navigate('/', { replace: true }) // redirect to home page if error
        }
        if (data) {
          console.log(data)
          setTitle(data.title)
          setMethod(data.method)
          setRating(data.rating)
        }
      } catch (error) {
        setLoading(false)
        console.log('Error: >>>>>>', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSmoothie()
  }, [id, navigate])

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
        .update({ title, method, rating })
        .eq("id", id) // updating (editing) single row (data) in smoothies table

      if (error) {
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
      setLoading(false)
    }
  }

  return (
    <div className="page update">
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
          {loading ? 'Updating...' : 'Update Smoothie Recipe'}
        </button>
      </form>
    </div>
  )
}

export default Update
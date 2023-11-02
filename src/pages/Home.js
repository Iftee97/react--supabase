import React, { useState, useEffect } from "react"
import SmoothieCard from "../components/SmoothieCard"
import supabase from "../config/supabaseClient"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState([])
  const [orderBy, setOrderBy] = useState('created_at')
  const [loading, setLoading] = useState(false)

  const handleDelete = (id) => {
    setSmoothies(prevSmoothies => prevSmoothies.filter(smoothie => smoothie.id !== id)) // filtering out the deleted smoothie from local state
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("smoothies")
          .select() // fetching all rows (data) from 'smoothies' the table
          .order(orderBy, { ascending: false }) // ordering the data by the orderBy state

        if (error) {
          setFetchError('could not fetch smoothies')
          setSmoothies(null)
          console.log(error)
          throw Error
        }
        if (data) {
          setSmoothies(data)
          setFetchError(null)
        }
      } catch (error) {
        console.log('error: >>>>>>>', error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    fetchSmoothies()
  }, [orderBy])

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies?.length > 0 && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>
              Time Created
            </button>
            <button onClick={() => setOrderBy('rating')}>
              Rating
            </button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
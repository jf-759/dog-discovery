import { useState, useEffect } from 'react'
import DogCard from "./components/DogCard"
import BanList from "./components/BanList"
import './App.css'

function App() {
  const [dog, setDog] = useState(null)
  const [banList, setBanList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDog = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        "https://api.thedogapi.com/v1/images/search?include_breeds=true",
        {
          headers: {
            "x-api-key": import.meta.env.VITE_DOG_API_KEY
          }
        }
      )

      const data = await res.json()
      const newDog = data[0]

      if (newDog.breeds?.length > 0) {
        const breedName = newDog.breeds[0].name

        if (!banList.includes(breedName)) {
          setDog(newDog)
        } else {
          fetchDog()
        }
      } else {
        fetchDog()
      }
    } catch {
      setError("Failed to fetch dog data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDog()
  }, [])

  const handleBan = (breed) => {
    if (!banList.includes(breed)) {
      setBanList([...banList, breed])
    }
  }

  const removeBan = (breed) => {
    setBanList(banList.filter((b) => b !== breed))
  }

  return (
    <div className="app-container">
      <h1> Discover a Dog! </h1>
      <button onClick={fetchDog}>
        Discover New Dog
      </button>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {dog && dog.breeds && dog.breeds.length > 0 && (
        <DogCard dog={dog} onBan={handleBan} />
      )}

      <BanList banList={banList} onRemove={removeBan} />
    </div>
  )
}

export default App

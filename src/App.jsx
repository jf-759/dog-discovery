import { useState, useEffect } from 'react'
import DogCard from "./components/DogCard"
import BanList from "./components/BanList"
import './App.css'

function App() {
  const [dog, setDog] = useState(null)
  const [banList, setBanList] = useState([])
  const [history, setHistory] = useState ([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDog = async (retryCount = 0) => {
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

      if (!newDog.breeds?.length) {
        if (retryCount < 10) return fetchDog(retryCount + 1)
        else throw new Error("No valid dog found")
      }

      const breedName = newDog.breeds[0].name

      if (banList.includes(breedName)) {
        if (retryCount < 10) return fetchDog(retryCount + 1)
        else throw new Error ("no more dogs available")
      }

      setDog(newDog)
      setHistory(prevHistory => [newDog, ...prevHistory])

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
      <button onClick={() => fetchDog()}>
        Discover New Dog
      </button>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {dog && dog.breeds && dog.breeds.length > 0 && (
        <DogCard dog={dog} onBan={handleBan} />
      )}

      <BanList banList={banList} onRemove={removeBan} />

      <div className="history">
        <h3>Previously Seen Dogs</h3>
        {history.length === 0 ? (
          <p>No history yet</p>
        ) : (
          <div className="history-grid">
            {history.map((d, index) => (
              <div key={index} className="history-item">
                <img src={d.url} alt={d.breeds[0].name} />
                <p>
                  <span
                    className="clickable"
                    onClick={() => handleBan(d.breeds[0].name)}
                  >
                    {d.breeds[0].name}
                  </span>
                </p>
                <p
                  className="clickable"
                  onClick={() => handleBan(d.breeds[0].temperament)}
                >
                  {d.breeds[0].temperament}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App

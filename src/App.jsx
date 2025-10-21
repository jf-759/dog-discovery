import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [dog, setDog] = useState(null)
  const [banList, setBanList] = useState([])

  const fetchDog = async () => {
    const res = await fetch("https://api.thedogapi.com/v1/images/search?include_breeds=true")
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
  }

  useEffect (() => {
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
    </div>
  )
}

export default App

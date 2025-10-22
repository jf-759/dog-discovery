function DogCard({ dog, onBan }) {
    const breed = dog.breeds[0]

    return (
        <div className="dog-card">
            <img src={dog.url} alt={breed.name} className="dog-image" />
            <h2>{breed.name}</h2>
            <p>Temperament: {breed.temperament || "Unknown"}</p>
            <p>Life Span: {breed.life_span}</p>

            <button onClick={() => onBan(breed.name)}>Ban This Breed</button>
        </div>
    )
}

export default DogCard
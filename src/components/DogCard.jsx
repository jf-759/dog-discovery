function DogCard({ dog, onBan }) {
    const breed = dog.breeds[0]

    return (
        <div className="dog-card">
            <img src={dog.url} alt={breed.name} className="dog-image" />
            <h2
                className="clickable"
                onClick={() => onBan(breed.name)}
            >
                {breed.name}
            </h2>
            <p
                className="clickable"
                onClick={() => onBan(breed.temperament)}
            >
                Temperament: {breed.temperament || "Unknown"}
            </p>
            <p
                className="clickable"
                onClick={() => onBan(breed.life_span)}
            >
                Life Span: {breed.life_span || "Unknown"}
            </p>
        </div>
    )
}

export default DogCard
function BanList({ banList, onRemove }) {
    return (
        <div className="ban-list">
            <h3>Banned Breeds</h3>
            {banList.length === 0 ? (
                <p>No breeds banned yet!</p>
            ) : (
                <ul>
                    {banList.map((breed) => (
                        <li key={breed}>
                            {breed}
                            <button onClick={() => onRemove(breed)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}


export default BanList
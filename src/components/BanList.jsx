function BanList({ banList, onRemove }) {
    return (
        <div className="ban-list">
            <h3>Banned Attributes</h3>
            {banList.length === 0 ? (
                <p>No attributes banned yet!</p>
            ) : (
                <ul>
                    {banList.map((attr) => (
                        <li key={attr}>
                            {attr}{" "}
                            <button onClick={() => onRemove(attr)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}


export default BanList
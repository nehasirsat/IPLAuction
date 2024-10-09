import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Player.css'
//import './PlayerCards.css'; // Import your CSS for styling

const PlayersPool = () => {
    const [players, setPlayers] = useState([]);
    const [editingPlayerId, setEditingPlayerId] = useState(null);
    const [editingPlayerName, setEditingPlayerName] = useState('');

    // Fetch players from backend on component mount
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/players'); // Update with your backend URL
                setPlayers(response.data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchPlayers();
    }, []);

    const handleEdit = (id, name) => {
        setEditingPlayerId(id);
        setEditingPlayerName(name);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/players/${editingPlayerId}`, {
                name: editingPlayerName
            });
            setPlayers(players.map(player =>
                player.id === editingPlayerId ? { ...player, name: editingPlayerName } : player
            ));
            setEditingPlayerId(null);
            setEditingPlayerName('');
        } catch (error) {
            console.error('Error updating player:', error);
        }
    };

    return (
        <div className="player-cards-container">
            <h1>Players</h1>
            <div className="player-cards">
                {players.map(player => (
                    <div className="player-card" key={player.id}>
                        <h2>{player.name}</h2>
                        <p>Slab: {player.slab}</p>
                        <p>Base Price: {player.basePrice}</p>
                        <p>Status: {player.status}</p>
                        {editingPlayerId === player.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editingPlayerName}
                                    onChange={(e) => setEditingPlayerName(e.target.value)}
                                />
                                <button onClick={handleUpdate}>Save</button>
                            </div>
                        ) : (
                            <button onClick={() => handleEdit(player.id, player.name)}>Edit</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};



export default PlayersPool;

import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SelectedPlayers = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const[selectedPlayers, setPlayers]=useState([]);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/select-players');
                setPlayers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch players.');
                setLoading(false);
            }
        };

    })

    const handleStartAuction = () => {
        // Navigate to the auction page
        navigate('/auction');
    };

    return (
        <div>
            <h1>Selected Players</h1>
            <div>
                {selectedPlayers.length === 0 ? (
                    <p>No players selected.</p>
                ) : (
                    <ul>
                        {selectedPlayers.map(player => (
                            <li key={player.id}>{player.name}</li>
                        ))}
                    </ul>
                )}
            </div>
            {selectedPlayers.length > 0 && ( // Show button only if players are selected
                <button onClick={handleStartAuction}>
                    Start Auction
                </button>
            )}
        </div>
    );
};

export default SelectedPlayers;

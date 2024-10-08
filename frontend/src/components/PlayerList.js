import React, { useEffect, useState } from 'react';
import '../styles/playerList.css'; // Import CSS for styling

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:5000/players'); // Adjust the URL as needed
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="player-list">
      {players.map((player) => (
        <div className="player-card" key={player.id}>
          <h3>{player.name}</h3>
          <p>Slab: {player.slab}</p>
          <p>Base Price: {player.basePrice}</p>
          <p>Max Bid: {player.maxBid}</p>
          <p>Status: {player.status}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/soldplayers.css'


const PlayerListPage = () => {
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [editingPlayerId, setEditingPlayerId] = useState(null);
    const [editingPlayerName, setEditingPlayerName] = useState('');
  
    useEffect(() => {
      const fetchPlayers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/players');
          setPlayers(response.data);
          setFilteredPlayers(response.data);
        } catch (error) {
          console.error('Error fetching players:', error);
        }
      };
  
      fetchPlayers();
    }, []);
  
    const handleFilterChange = (filter) => {
      switch (filter) {
        case 'all':
          setFilteredPlayers(players);
          break;
        case 'sold':
          setFilteredPlayers(players.filter(player => player.status === 'sold'));
          break;
        case 'unsold':
          setFilteredPlayers(players.filter(player => player.status === 'available'));
          break;
        case 'slab':
          // Implement slab-wise filtering if needed
          setFilteredPlayers(players); // Placeholder
          break;
        default:
          setFilteredPlayers(players);
      }
    };
  
  
    // Function to group players by slab
    const groupedPlayers = () => {
      return filteredPlayers.reduce((acc, player) => {
        acc[player.slab] = acc[player.slab] || [];
        acc[player.slab].push(player);
        return acc;
      }, {});
    };
  
    const grouped = groupedPlayers();
  
    return (
      <div className="player-cards-container">
        <nav className="navbar">
          <button onClick={() => handleFilterChange('all')}>All Players</button>
          <button onClick={() => handleFilterChange('sold')}>Sold Players</button>
          <button onClick={() => handleFilterChange('unsold')}>Unsold Players</button>
          {/* <button onClick={() => handleFilterChange('slab')}>Slab Wise Players</button> */}
        </nav>
        <h1>Players</h1>
        <div className="player-cards">
          {Object.keys(grouped).map(slab => (
            <div key={slab}>
              <h2>{`Slab: ${slab}`}</h2>
              <hr />
              {grouped[slab].map(player => (
                <div className="player-card" key={player.id}>
                  <h3>{player.name}</h3>
                  <p>Base Price: {player.basePrice}</p>
                  <p>Status: {player.status}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default PlayerListPage;

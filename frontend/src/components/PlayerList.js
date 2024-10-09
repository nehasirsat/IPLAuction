import React, { useEffect, useState } from 'react';
import '../styles/playerList.css'; // Import CSS for styling
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  let clicked=0;
  const navigate = useNavigate();

  const notify = () => {
    toast.success("Your message here!", {
      position: "top-left", // Correctly specify the position as a string
      autoClose: 5000,
    });
};

  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);

  const [selectedCount, setSelectedCount] = useState(9);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handleSelection = async (e) => {
    const count = parseInt(e.target.value);
    setSelectedCount(count);

    // Select the first 'count' players from the player pool
    const playersToSelect = players.slice(0, count);
    const playerIds = playersToSelect.map(player => player.id);
    setSelectedPlayerIds(playerIds);
    setSelectedPlayers(playersToSelect);

    try {
      const response = await axios.post('http://localhost:5000/select-players', {
          selectedPlayerIds,
      });
      //alert(response.data.message);
      
  } catch (error) {
      console.error('Error adding players to auction list:', error);
      alert('Failed to add players to auction list.');
  }
  };

    const handleSelectPlayer = (playerId) => {
        setSelectedPlayerIds((prevIds) => {
            if (prevIds.includes(playerId)) {
                // Remove player from selection
                return prevIds.filter(id => id !== playerId);
            } else {
                // Add player to selection
                return [...prevIds, playerId];
            }
        });
    };

    const handleStartAuction = () => {
      navigate('/auction')
  };

    const handleSubmitSelection = async () => {
      clicked=1;
      if(selectedPlayerIds.length%3!=0)
      {
           alert('No of selected players must be multiple of three');
          // notify();
           return;
      }
        try {
            const response = await axios.post('http://localhost:5000/select-players', {
                selectedPlayerIds,
            });
            alert(response.data.message);
            
        } catch (error) {
            console.error('Error adding players to auction list:', error);
            alert('Failed to add players to auction list.');
        }
        //navigate('/SelectedList')
    };

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
    <>
    <div>
      <h2>Select Players for Auction</h2>
      <label htmlFor="playerCount">Select Number of Players:</label>
      <select id="playerCount" value={selectedCount} onChange={handleSelection}>
        <option value={9}>9</option>
        <option value={12}>12</option>
        <option value={15}>15</option>
        <option value={21}>21</option>
        {/* Add more options as needed */}
      </select>

      <h3>Selected Players:</h3>
      <ul>
        {selectedPlayers.map(player => (
          <li key={player.id}>{player.name} - {player.slab}</li>
        ))}
      </ul>

      <button onClick={() => navigate("/auction")}>
        Start Auction
      </button>
    </div>
    <div className="player-list">
      {players.map((player) => (
        <div className="player-card" key={player.id}>
          <h3>{player.name}</h3>
          <p>Slab: {player.slab}</p>
          <p>Base Price: {player.basePrice}</p>
          <p>Max Bid: {player.maxBid}</p>
          <p>Status: {player.status}</p>
          <button onClick={() => handleSelectPlayer(player.id)}>
                        {selectedPlayerIds.includes(player.id) ? 'Deselect' : 'Select'}
          </button>
        </div>
      ))}
    </div>
    
    <button onClick={handleSubmitSelection}>Add Selected Players to Auction</button>
     
    <button 
        onClick={handleStartAuction} 
        disabled={selectedPlayerIds.length === 0 && clicked==0} // Disable if no players selected
    >
        Start Auction
    </button>
    </>
  );
};

export default PlayerList;


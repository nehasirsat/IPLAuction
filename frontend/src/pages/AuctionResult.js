import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/results.css";

const AuctionResults = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch teams and their players after auction submission
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/teams'); // Adjust the API endpoint as needed
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <>
    <h2>Auction Results</h2>
    <div className='res'>
      {teams.length > 0 ? (
        teams.map((team) => (
          <div key={team.id} className="team-card">
            <h3>{team.owner}</h3>
            <h4>Players:</h4>
            <ul className="player-list">
              {team.players.length > 0 ? (
                team.players.map((player) => (
                  <li key={player.id}>
                    {player.name} - Slab: {player.slab} - Current Bid: {player.currentBid}
                  </li>
                ))
              ) : (
                <li>No players in this team</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>No teams available.</p>
      )}
    </div>
    </>
  );
};

export default AuctionResults;

import { useEffect, useState } from "react";
import BidsTable from "../components/BidsTable";
import CurrentBid from "../components/CurrentBid";
import PlayerList from "../components/PlayerList";
import TeamList from "../components/TeamList";
import axios from 'axios'
import "../styles/auction.css";

export default function Auction() {

  //   const [player, setPlayers] = useState([]);
  //   const [teams, setTeams] = useState([]);
  //   const [selectedPlayer, setSelectedPlayer] = useState(null)
  //   const [biddingTeam, setBiddingTeam] = useState(null)
  //   const [currBid, setCurrBid] = useState(0);

  //   const players = [
  //     { id: 1, name: 'Player 1', slab: 'A', basePrice: 200 },
  //     { id: 2, name: 'Player 2', slab: 'B', basePrice: 150 },
  //     { id: 3, name: 'Player 3', slab: 'C', basePrice: 100 },
  //     { id: 4, name: 'Player 4', slab: 'D', basePrice: 80 },
  //     { id: 5, name: 'Player 5', slab: 'E', basePrice: 50 },
  // ];

  //   useEffect(() => {
  //     const loadPlayers = async() => {
  //       const response = await axios.get(`http://localhost:5000/players`)
  //       console.log(response.data)
  //       setPlayers(response.data);
  //     }

  //     const loadTeams = async() => {
  //       const response1 = await axios.get(`http://localhost:5000/teams`)
  //       console.log(response1.data)
  //       setTeams(response1.data);
  //     }
  //     loadPlayers();
  //     loadTeams();
      
  //   }, []);

  //   const [currentIndex, setCurrentIndex] = useState(0);

  //   const nextPlayer = () => {
  //       setCurrentIndex((prevIndex) => (prevIndex + 1) % players.length);
  //   };

  //   const currentPlayer = players[currentIndex];

  // return (
  //   <>
  //     <div className="auction-page">
  //       {/* <div>
  //         <CurrentBid
  //           player={selectedPlayer}
  //           team={biddingTeam}
  //           currBidAmt={currBid}
  //         />
  //       </div> */}

  //       <div className="players-teams">
  //         <div className="player-list">
  //         <h1>Current Player</h1>
  //           <div className="player-details">
  //               <h2>{currentPlayer.name}</h2>
  //               <p>Slab: {currentPlayer.slab}</p>
  //               <p>Base Price: {currentPlayer.basePrice} units</p>
  //           </div>
  //           <button onClick={nextPlayer}>Next Player</button>
  //         </div>
          
  //         <div className="team-list">
  //               {teams.map((team) => (
  //                   <div className="team-card" key={team.id}>
  //           <div className='team-name'>{team.owner}</div>
            
  //           <div className='team-units'>
  //           <div>Units available </div>
  //           <div >{team.units}</div>
  //           </div>
  //           <button className='team-button'>Show current players</button> 
  //                   </div>
  //               ))}
  //           </div>
  //       </div>

  //       {/* <div className="bids-table">
  //         <BidsTable bids={[]} />
  //       </div> */}
  //     </div>
  //   </>
  // );

  const [players, setPlayers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [bidAmount, setBidAmount] = useState(0);
  const [currentTeamId, setCurrentTeamId] = useState(null);
  //const [currentBid,setCurrBid] =useState(0);

  useEffect(() => {
      const fetchPlayers = async () => {
          try {
              const response = await axios.get('http://localhost:5000/players');
              setPlayers(response.data);
              setLoading(false);
          } catch (err) {
              setError('Failed to fetch players.');
              setLoading(false);
          }
      };

      const fetchTeams = async () => {
          try {
              const response = await axios.get('http://localhost:5000/teams');
              setTeams(response.data);
          } catch (err) {
              setError('Failed to fetch teams.');
          }
      };

      fetchPlayers();
      fetchTeams();
  }, []);

  const nextPlayer = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % players.length);
      setBidAmount(0);  // Reset bid amount when moving to next player
      setCurrentTeamId(null);  // Reset selected team
  };

  const PlaceBid=async()=>{
    const currentPlayer = players[currentIndex];
      if (currentTeamId === null || bidAmount <= 0) {
          alert('Please select a team and enter a valid bid amount.');
          return;
      }

      const team = teams.find(t => t.id === currentTeamId);

      // Make sure the bid amount is valid
      if (bidAmount < currentPlayer.basePrice || bidAmount > currentPlayer.maxBid) {
          alert('Bid amount is outside of limits.');
          return;
      }

      if (team.units < bidAmount) {
          alert('Insufficient units.');
          return;
      }
      
      if (team.playerCount[currentPlayer.slab] > 1) 
      {
        alert("Maximum players in this slab reached.")
      }
      try {
        const response = await axios.post('http://localhost:5000/placebid', {
            teamId: currentTeamId,
            playerId: currentPlayer.id,
            bidAmount,
        });

        // Handle response (e.g., updating teams and players)
        const updatedTeam = response.data.team;
        const updatedPlayer = response.data.player;


        setPlayers((prevPlayers) =>
            prevPlayers.map(p => p.id === updatedPlayer.id ? updatedPlayer : p)
        );

        //alert(`Bid placed successfully!`);
        //nextPlayer();  // Move to the next player after a successful bid
    } catch (err) {
        alert('Failed to place bid. ' + err.response.data);
    }
      
  }

  const FinalizeBid = async () => {
      const currentPlayer = players[currentIndex];
      if (currentTeamId === null || bidAmount <= 0) {
          alert('Please select a team and enter a valid bid amount.');
          return;
      }

      const team = teams.find(t => t.id === currentTeamId);

      // Make sure the bid amount is valid
      if (bidAmount < currentPlayer.basePrice || bidAmount > currentPlayer.maxBid) {
          alert('Bid amount is outside of limits.');
          return;
      }

      if (team.units < bidAmount) {
          alert('Insufficient units.');
          return;
      }

      if (team.playerCount[currentPlayer.slab] > 1) 
        {
          alert("Maximum players in this slab reached.")
        }

      try {
          const response = await axios.post('http://localhost:5000/bid', {
              teamId: currentTeamId,
              playerId: currentPlayer.id,
              bidAmount,
          });

          // Handle response (e.g., updating teams and players)
          const updatedTeam = response.data.team;
          const updatedPlayer = response.data.player;

          // Update local teams state
          setTeams((prevTeams) =>
              prevTeams.map(t => t.id === updatedTeam.id ? updatedTeam : t)
          );

          // Update players array
          setPlayers((prevPlayers) =>
              prevPlayers.map(p => p.id === updatedPlayer.id ? updatedPlayer : p)
          );

          alert(`Bid placed successfully! ${updatedPlayer.name} is now with ${updatedTeam.owner}.`);
          nextPlayer();  // Move to the next player after a successful bid
      } catch (err) {
          alert('Failed to place bid. ' + err.response.data);
      }
  };

  // Handle loading and error states
  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>{error}</div>;
  }

  const currentPlayer = players[currentIndex];

  return (
    
      <div className="player-bid-page">
          {/* <h1>Welcome To Auction</h1> */}
          <h2>Current Player</h2>
          <div className="player-details">
              <h2>{currentPlayer.name}</h2>
              <p>Slab: {currentPlayer.slab}</p>
              <p>Base Price: {currentPlayer.basePrice} units</p>
              <p>Status: {currentPlayer.status}</p>
              <p>Current Bid: {currentPlayer.currentBid}</p>
          </div>

          <h2>Bid Amount:</h2>
          <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              min={currentPlayer.basePrice}
              max={currentPlayer.maxBid}
          />
          <div>
          <button onClick={PlaceBid}>Place Bid</button>
          </div>
          <h2>Select Team to Bid:</h2>
          <div className="team-list">
          {teams.map((team) => (
              <div className="team-card" key={team.id}>
                  <h3>{team.owner}</h3>
                  <div>Units available </div>
                  <div >{team.units}</div>
                  <button onClick={() => {setCurrentTeamId(team.id);
                  setBidAmount(0);
                  }}>
                      {currentTeamId === team.id ? 'Selected' : 'Select'}
                  </button>
              </div>
          ))}
          </div>

          <button onClick={FinalizeBid}>Finalize Bid</button>
          <button onClick={nextPlayer}>Next Player</button>
      </div>
  );

  //import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import '../styles/playerBidPage.css';

//const PlayerBidPage = () => {
   

//export default PlayerBidPage;
}

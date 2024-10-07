// src/pages/Auction.js
import React, { useEffect, useState } from 'react';
import PlayerList from '../components/PlayerList';
import BidPanel from '../components/BidPanel';
import TeamDashboard from '../components/TeamDashBoard';
import { fetchPlayers, placeBid } from '../services/api';

const Auction = () => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([
        { id: 1, owner: 'Team Owner 1', units: 2500, players: [] },
        { id: 2, owner: 'Team Owner 2', units: 2500, players: [] },
        { id: 3, owner: 'Team Owner 3', units: 2500, players: [] },
    ]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const loadPlayers = async () => {
            // const data = await fetchPlayers();
            setPlayers([{name:"Akshay"}, {name:"Abc"}]);
        };
        loadPlayers();
    }, []);

    const handleBid = async (player, bidAmount) => {
        if (bidAmount < player.basePrice || bidAmount > 800 || teams[0].units < bidAmount) {
            setNotification('Invalid bid amount.');
            return;
        }

        try {
            await placeBid({ playerId: player.id, bidAmount });
            setNotification(`Successfully bid ${bidAmount} on ${player.name}`);
            // Update player and team states after a successful bid
            setPlayers(prevPlayers => prevPlayers.map(p => p.id === player.id ? { ...p, status: 'sold' } : p));
            // Add player to the first team for demonstration (you can implement logic for different teams)
            setTeams(prevTeams => {
                const updatedTeams = [...prevTeams];
                updatedTeams[0].players.push(player);
                updatedTeams[0].units -= bidAmount;
                return updatedTeams;
            });
        } catch (error) {
            setNotification('Bid submission failed.');
        }
        console.log("bid set")
    };

    return (
        <div>
            <h1>IPL Auction</h1>
            {/* {notification && <div className="notification">{notification}</div>} */}
            
            <PlayerList players={players} onBid={setSelectedPlayer} />
            
                <BidPanel selectedPlayer={selectedPlayer} onPlaceBid={handleBid} />
            
            <TeamDashboard team={teams[0]} />
        </div>
    );
};

export default Auction;

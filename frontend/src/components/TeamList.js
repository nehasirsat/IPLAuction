import { useState, useEffect } from "react";
import Team from "../cards/Team";
import "../styles/teamList.css"; // Import the new CSS
import axios from 'axios';

export default function TeamList({ teams, selectedTeam, setBid, bid,selectedPlayer,selectBiddingTeam}) {

    const handleBid = async (team) => {
       // e.preventDefault();

        selectBiddingTeam(team)

        if (!selectedTeam || !bid) {
            alert("please add bid")
            return;
        }  


        try {
            const response = await axios.post('http://localhost:5000/bid', {

                //teamId, playerId, bidAmount
                teamId: team.id,
                playerId: selectedPlayer.id,
                bidAmount: parseInt(bid),
            });
            alert(response.data.message);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    return (
        <div className="team-list"> {/* Apply class for styling */}
            <h1>Teams</h1>
            {teams.map(team => (
                <div className="Team-x" key={team.id}>
                    <Team team={team} />
                    <label htmlFor="bid">Bid Amount:</label>
                    <input
                        type="number"
                        id={team.id}
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                    />
                <button type="submit" onClick={()=>handleBid(team)}>Place Bid</button>
                </div>
            ))}
        </div>
    );
}

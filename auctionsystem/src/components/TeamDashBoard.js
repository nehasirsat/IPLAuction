// src/components/TeamDashboard.js
import React from 'react';

const TeamDashboard = ({ team }) => {
    return (
        <div>
            <h2>{team.owner}'s Team</h2>
            <p>Remaining Units: {team.units}</p>
            <h3>Players:</h3>
            <ul>
                {team.players.map(player => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TeamDashboard;

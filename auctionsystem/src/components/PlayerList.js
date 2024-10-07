// src/components/PlayerList.js
import React from 'react';

const PlayerList = ({ players, onBid }) => {
    return (
        <div>
            <h2>Available Players</h2>
            <ul>
                {players.map(player => (
                    <li key={player.id}>
                        {player.name} - {player.status} (Base Price: {player.basePrice})
                        <button onClick={() => onBid(player)} disabled={player.status !== 'available'}>
                            Bid
                        </button>
                    </li>
                ))}
                <button>{players[0].name}</button>
                <button>{players[1].name}</button>
            </ul>
        </div>
    );
};

export default PlayerList;

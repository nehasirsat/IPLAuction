// src/components/BidPanel.js
import React, { useState } from 'react';

const BidPanel = ({ selectedPlayer, onPlaceBid }) => {
    const [bidAmount, setBidAmount] = useState(0);

    const handleBid = () => {
        onPlaceBid();
        setBidAmount(0);
    };

    return (
        <div>
            <h2>Bid for {"Hanuman"}</h2>
            <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter bid amount"
            />
            <button onClick={handleBid}>Submit Bid</button>
        </div>
    );
};

export default BidPanel;

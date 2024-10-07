// src/components/BidTable.js
import React from 'react';

const BidsTable = ({ bids }) => {
    return (
        <div>
            <h2>Bidding Overview</h2>
            <table>
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Allocated Team</th>
                        <th>Bid Price</th>
                    </tr>
                </thead>
                <tbody>
                    {bids.length === 0 ? (
                        <tr>
                            <td colSpan="3">No players have been bid on yet.</td>
                        </tr>
                    ) : (
                        bids.map((bid, index) => (
                            <tr key={index}>
                                <td>{bid.playerName}</td>
                                <td>{bid.teamOwner}</td>
                                <td>{bid.bidPrice}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BidsTable;

// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to the IPL Auction</h1>
            <p>
                Join the excitement and bid for your favorite players to form your dream team!
            </p>
            <Link to="/auction">
                <button className="start-auction-button">Start Auction</button>
            </Link>
        </div>
    );
};

export default Home;

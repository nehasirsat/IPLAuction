import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homePage.css'; // Adjust the path according to your project structure

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Welcome to the IPL Auction</h1>
            <p>Your one-stop platform to manage and bid on players!</p>
            <div className="options">
                <Link to="/PlayerList" className="card">
                    {/* <img src="path/to/players-image.jpg" alt="Players" /> */}
                    <h2>View All Players</h2>
                </Link>
                <Link to="/teams" className="card">
                    {/* <img src="path/to/teams-image.jpg" alt="Teams" /> */}
                    <h2>View All Teams</h2>
                </Link>
                <Link to="/sold-players" className="card">
                    {/* <img src="path/to/sold-players-image.jpg" alt="Sold Players" /> */}
                    <h2>View Sold Players</h2>
                </Link>
                <Link to="/auction" className="card">
                    {/* <img src="path/to/auction-image.jpg" alt="Auction" /> */}
                    <h2>Start Bidding</h2>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;


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
                    <h2>Configure Players</h2>
                    <h4>Explore the complete roster of players available for the auction. Get insights into their stats, current status, and bid history.</h4>
                </Link>
                <Link to="/teams" className="card">
                    {/* <img src="path/to/teams-image.jpg" alt="Teams" /> */}
                    <h2>View All Teams</h2>
                    <h4>Check out the participating teams and their owners. See how many players each team has, along with their available bidding units.</h4>
                </Link>
                <Link to="/playersPool" className="card">
                    {/* <img src="path/to/sold-players-image.jpg" alt="Sold Players" /> */}
                    <h2>Players Pool</h2>
                    <h4>Discover the pool of players eligible for the auction. Review their details, including categories, base prices, and maximum bid limits.</h4>
                </Link>
                <Link to="/auction" className="card">
                    {/* <img src="path/to/auction-image.jpg" alt="Auction" /> */}
                    <h2>Start Bidding</h2>
                    <h4>Kick off the auction! Begin placing bids on players and compete to build your ultimate team. May the best bid win!</h4>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;


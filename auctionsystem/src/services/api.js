// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Adjust the base URL if necessary

// Fetch all players
export const fetchPlayers = async () => {
    try {
        const response = await axios.get(`${API_URL}/players`);
        return response.data;  // Assuming the API returns a list of players
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;  // Re-throw to handle it later
    }
};

// Place a bid on a player
export const placeBid = async (bidData) => {
    try {
        const response = await axios.post(`${API_URL}/players/bid`, bidData);
        return response.data;  // Assuming it returns the result of the bid
    } catch (error) {
        console.error('Error placing bid:', error);
        throw error;  // Re-throw to handle it later
    }
};

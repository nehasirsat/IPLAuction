const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const { stringify } = require('flatted');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock Data
let players = [
    { id: 1, name: 'Player 1', slab: 'A', basePrice: 200, maxBid: 800, status: 'available', currentBid:0, winner:null },
    { id: 2, name: 'Player 2', slab: 'B', basePrice: 150, maxBid: 800, status: 'available' , currentBid:0, winner:null},
    { id: 3, name: 'Player 3', slab: 'C', basePrice: 150, maxBid: 800, status: 'available',currentBid:0, winner:null },
    { id: 4, name: 'Player 4', slab: 'D', basePrice: 200, maxBid: 800, status: 'available',currentBid:0, winner:null },
    { id: 5, name: 'Player 5', slab: 'E', basePrice: 150, maxBid: 800, status: 'available',currentBid:0, winner:null },
    { id: 6, name: 'Player 6', slab: 'A', basePrice: 150, maxBid: 800, status: 'available',currentBid:0, winner:null },
    { id: 7, name: 'Player 7', slab: 'B', basePrice: 150, maxBid: 800, status: 'available',currentBid:0, winner:null },
    { id: 8, name: 'Player 8', slab: 'C', basePrice: 150, maxBid: 800, status: 'available',currentBid:0, winner:null },
    { id: 9, name: 'Player 9', slab: 'D', basePrice: 150, maxBid: 800, status: 'available',currentBid:0, winner:null },
    { id: 10, name: 'Player 10', slab: 'E', basePrice: 150, maxBid: 800, status: 'available',currentBid:0, winner:null },
    // Add more players here...
];

let teams = [
    { id: 1, owner: 'Team Owner 1', units: 2500, players: [], playerCount: { A: 0, B: 0, C: 0, D: 0, E: 0 }  },
    { id: 2, owner: 'Team Owner 2', units: 2500, players: [], playerCount: { A: 0, B: 0, C: 0, D: 0, E: 0 } },
    { id: 3, owner: 'Team Owner 3', units: 2500, players: [],playerCount: { A: 0, B: 0, C: 0, D: 0, E: 0 }  },
];

// API Endpoints
app.get('/players', (req, res) => {
    res.json(players);
});

app.get('/teams', (req, res) => {
    res.json(teams);
});

app.post('/bid', (req, res) => {
    const { teamId, playerId, bidAmount } = req.body;

    const team = teams.find(t => t.id === teamId);
    const player = players.find(p => p.id === playerId);

    if (!team || !player) {
        return res.status(400).send('Invalid team or player ID.');
    }

    // Bidding Logic
    if (bidAmount < player.basePrice || bidAmount > player.maxBid) {
        return res.status(400).send('Bid amount is outside of limits.');
    }
    if (team.units < bidAmount) {
        return res.status(400).send('Insufficient units.');
    }

    team.playerCount[player.slab]++;
    if (team.playerCount[player.slab] > 2) {
        return res.status(400).json({ message: "Maximum players in this slab reached." });
    }
    // Assign player to the team
    team.players.push(player);
    team.units -= bidAmount;
    player.status = 'sold';

    player.currentBid = bidAmount;
    player.winner = team.id;
     
    //return res.status(400).send(team,)
    return res.json({ team, player });
    //res.json(stringify(team,player));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const { stringify } = require('flatted');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock Data
let players = [
        { id: 1, name: "Virat Kohli", slab: "A", basePrice: 200, maxBid: 800, status: "available", currentBid: 0, winner: null },
        { id: 2, name: "Rohit Sharma", slab: "A", basePrice: 200, maxBid: 800, status: "available", currentBid: 0, winner: null },
        { id: 3, name: "Jasprit Bumrah", slab: "B", basePrice: 150, maxBid: 800, status: "available", currentBid: 0, winner: null },
        { id: 4, name: "Hardik Pandya", slab: "B", basePrice: 150, maxBid: 800, status: "available", currentBid: 0, winner: null },
        { id: 5, name: "KL Rahul", slab: "C", basePrice: 100, maxBid: 700, status: "available", currentBid: 0, winner: null },
        { id: 6, name: "Ravindra Jadeja", slab: "C", basePrice: 100, maxBid: 700, status: "available", currentBid: 0, winner: null },
        { id: 7, name: "Shreyas Iyer", slab: "D", basePrice: 80, maxBid: 700, status: "available", currentBid: 0, winner: null },
        { id: 8, name: "Bhuvneshwar Kumar", slab: "D", basePrice: 80, maxBid: 700, status: "available", currentBid: 0, winner: null },
        { id: 9, name: "Mohammed Shami", slab: "E", basePrice: 50, maxBid: 400, status: "available", currentBid: 0, winner: null },
        { id: 10, name: "Rishabh Pant", slab: "E", basePrice: 50, maxBid: 400, status: "available", currentBid: 0, winner: null },
        { id: 11, name: "Shikhar Dhawan", slab: "A", basePrice: 200, maxBid: 800, status: "available", currentBid: 0, winner: null },
        { id: 12, name: "Kagiso Rabada", slab: "B", basePrice: 150, maxBid: 800, status: "available", currentBid: 0, winner: null },
        { id: 13, name: "Ravichandran Ashwin", slab: "B", basePrice: 150, maxBid: 800, status: "available", currentBid: 0, winner: null },
        { id: 14, name: "Prithvi Shaw", slab: "C", basePrice: 100, maxBid: 700, status: "available", currentBid: 0, winner: null },
        { id: 15, name: "Ishan Kishan", slab: "C", basePrice: 100, maxBid: 700, status: "available", currentBid: 0, winner: null },
        { id: 16, name: "Deepak Chahar", slab: "D", basePrice: 80, maxBid: 700, status: "available", currentBid: 0, winner: null },
        { id: 17, name: "T Natarajan", slab: "D", basePrice: 80, maxBid: 700, status: "available", currentBid: 0, winner: null },
        { id: 18, name: "Shreyas Gopal", slab: "E", basePrice: 50, maxBid: 400, status: "available", currentBid: 0, winner: null },
        { id: 19, name: "Kuldeep Yadav", slab: "E", basePrice: 50, maxBid: 400, status: "available", currentBid: 0, winner: null },
        { id: 20, name: "Sanju Samson", slab: "A", basePrice: 200, maxBid: 800, status: "available", currentBid: 0, winner: null },
        { id: 21, name: "Navdeep Saini", slab: "B", basePrice: 150, maxBid: 800, status: "available", currentBid: 0, winner: null },
        { id: 22, name: "Shubman Gill", slab: "B", basePrice: 150, maxBid: 800, status: "available", currentBid: 0, winner: null },
        { id: 23, name: "Venkatesh Iyer", slab: "C", basePrice: 100, maxBid: 700, status: "available", currentBid: 0, winner: null },
        { id: 24, name: "Avesh Khan", slab: "C", basePrice: 100, maxBid: 700, status: "available", currentBid: 0, winner: null },
        { id: 25, name: "Rahul Chahar", slab: "D", basePrice: 80, maxBid: 700, status: "available", currentBid: 0, winner: null },
        { id: 26, name: "Krishna Rajagopal", slab: "D", basePrice: 80, maxBid: 700, status: "available", currentBid: 0, winner: null },
        { id: 27, name: "Kedar Jadhav", slab: "E", basePrice: 50, maxBid: 400, status: "available", currentBid: 0, winner: null },
        { id: 28, name: "Ruturaj Gaikwad", slab: "E", basePrice: 50, maxBid: 400, status: "available", currentBid: 0, winner: null },
        { id: 29, name: "Akhil Sheoran", slab: "E", basePrice: 50, maxBid: 400, status: "available", currentBid: 0, winner: null },
        { id: 30, name: "Suryakumar Yadav", slab: "A", basePrice: 200, maxBid: 800, status: "available", currentBid: 0, winner: null },
      
  // Add more players here...
];

let teams = [
  {
    id: 1,
    owner: "Royal Challengers Banglore",
    units: 2500,
    players: [],
    playerCount: { A: 0, B: 0, C: 0, D: 0, E: 0 },
  },
  {
    id: 2,
    owner: "Mumbai Indians",
    units: 2500,
    players: [],
    playerCount: { A: 0, B: 0, C: 0, D: 0, E: 0 },
  },
  {
    id: 3,
    owner: "Chennai Super Kings",
    units: 2500,
    players: [],
    playerCount: { A: 0, B: 0, C: 0, D: 0, E: 0 },
  },
];
let auctionList = [];

// API Endpoint to select players for auction
app.post('/select-players', (req, res) => {
    const { selectedPlayerIds } = req.body;

    // Filter selected players from the players array
    const selectedPlayers = players.filter(player => selectedPlayerIds.includes(player.id));

    // Add selected players to the auction list
    auctionList.push(...selectedPlayers);

    return res.json({ message: 'Players added to auction list', auctionList });
});

// API Endpoints
app.get("/players", (req, res) => {
  res.json(players);
});

app.get("/select-players", (req, res) => {
    res.json(auctionList);
  });

app.get("/teams", (req, res) => {
  res.json(teams);
});

app.post("/bid", (req, res) => {
  const { teamId, playerId, bidAmount } = req.body;

  const team = teams.find((t) => t.id === teamId);
  const player = auctionList.find((p) => p.id === playerId);

  if (!team || !player) {
    return res.status(400).send("Invalid team or player ID.");
  }

  // Bidding Logic
  if (bidAmount < player.basePrice || bidAmount > player.maxBid) {
    return res.status(400).send("Bid amount is outside of limits.");
  }
  if (team.units < bidAmount) {
    return res.status(400).send("Insufficient units.");
  }
  const slabCount = team.playerCount[player.slab] || 0;
  team.players.push(player);
  team.units -= bidAmount;
  player.status = "sold";

  player.currentBid = bidAmount;
  player.winner = team.id;
  team.playerCount[player.slab] = slabCount + 1;

  //return res.status(400).send(team,)
  return res.json({ team, player });
  //res.json(stringify(team,player));
});

app.put('/players/:id', (req, res) => {
    const playerId = parseInt(req.params.id);
    const { name } = req.body;

    const player = players.find(p => p.id === playerId);
    if (!player) {
        return res.status(404).send('Player not found.');
    }

    // Update the player's name
    player.name = name;

    res.json(player); // Respond with the updated player
});

app.post("/placebid", (req, res) => {
  const { teamId, playerId, bidAmount } = req.body;

  const team = teams.find((t) => t.id === teamId);
  const player = players.find((p) => p.id === playerId);

  if (!team || !player) {
    return res.status(400).send("Invalid team or player ID.");
  }

  // Bidding Logic
  if (bidAmount < player.basePrice || bidAmount > player.maxBid) {
    return res.status(400).send("Bid amount is outside of limits.");
  }
  if (team.units < bidAmount) {
    return res.status(400).send("Insufficient units.");
  }


  player.currentBid = bidAmount;
  //player.winner = team.id;

  //return res.status(400).send(team,)
  return res.json({ team, player });
  //res.json(stringify(team,player));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

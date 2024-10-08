import { useEffect, useState } from "react";
//import BidsTable from "../components/BidsTable";
//import CurrentBid from "../components/CurrentBid";
import PlayerList from "../components/PlayerList";
import TeamList from "../components/TeamList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/auction.css";

export default function Auction() {
  const [players, setPlayers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [bidAmount, setBidAmount] = useState(0);
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isBidding, setIsBidding] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);

  const navigate = useNavigate();
  //const [currentBid,setCurrBid] =useState(0);

  const [filteredTeams, setFilteredTeams] = useState([]);

  const notify = (m) => toast(m);

  useEffect(() => {
    const totalPlayers = players.length; // Get the total players in auction
    const maxPlayersPerTeam = Math.floor(totalPlayers / 3); // Calculate max players per team

    // Filter teams based on the player count condition
    const teamsWithAvailableSlots = teams.filter(
      (team) => team.players.length < maxPlayersPerTeam
    );
    setFilteredTeams(teamsWithAvailableSlots);
  }, [teams, players]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/select-players"
        );
        setPlayers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch players.");
        setLoading(false);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:5000/teams");
        setTeams(response.data);
      } catch (err) {
        setError("Failed to fetch teams.");
      }
    };

    fetchPlayers();
    fetchTeams();
  }, []);

  const nextPlayer = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % players.length);
    setBidAmount(0); // Reset bid amount when moving to next player
    //setTimer(0);
    setCurrentTeamId(null); // Reset selected team
  };

  const PlaceBid = async () => {
    const currentPlayer = players[currentIndex];
    if (currentTeamId === null || bidAmount <= 0) {
      alert("Please select a team and enter a valid bid amount.");
      return;
    }

    const team = teams.find((t) => t.id === currentTeamId);

    // Make sure the bid amount is valid
    if (
      bidAmount < currentPlayer.basePrice ||
      bidAmount > currentPlayer.maxBid
    ) {
      alert("Bid amount is outside of limits.");
      return;
    }

    if (team.units < bidAmount) {
      notify("Insufficient Units");
      return;
    }

    if (team.playerCount[currentPlayer.slab] > 1) {
      //alert("Maximum players in this slab reached.");
      notify("Maximum players in this slab reached.")
    }
    try {
      const response = await axios.post("http://localhost:5000/placebid", {
        teamId: currentTeamId,
        playerId: currentPlayer.id,
        bidAmount,
      });

      // Handle response (e.g., updating teams and players)
      const updatedTeam = response.data.team;
      const updatedPlayer = response.data.player;

      setPlayers((prevPlayers) =>
        prevPlayers.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
      );

      setTimer(10);
      setIsBidding(true);

      //alert(`Bid placed successfully!`);
      //nextPlayer();  // Move to the next player after a successful bid
    } catch (err) {
      alert("Failed to place bid. " + err.response.data);
    }
  };

  const FinalizeBid = async () => {

    if (isFinalizing) return; // Prevent multiple calls
    setIsFinalizing(true); 
    const currentPlayer = players[currentIndex];
    if (currentTeamId === null || bidAmount <= 0) {
      alert("Please select a team and enter a valid bid amount.");
      return;
    }

    const team = teams.find((t) => t.id === currentTeamId);

    // Make sure the bid amount is valid
    if (
      bidAmount < currentPlayer.basePrice ||
      bidAmount > currentPlayer.maxBid
    ) {
      alert("Bid amount is outside of limits.");
      return;
    }

    if (team.units < bidAmount) {
      alert("Insufficient units.");
      return;
    }

    if (team.playerCount[currentPlayer.slab] > 1) {
      alert("Maximum players in this slab reached.");
    }

    try {
      const response = await axios.post("http://localhost:5000/bid", {
        teamId: currentTeamId,
        playerId: currentPlayer.id,
        bidAmount,
      });

      // Handle response (e.g., updating teams and players)
      const updatedTeam = response.data.team;
      const updatedPlayer = response.data.player;

      // Update local teams state
      setTeams((prevTeams) =>
        prevTeams.map((t) => (t.id === updatedTeam.id ? updatedTeam : t))
      );

      // Update players array
      setPlayers((prevPlayers) =>
        prevPlayers.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
      );
      

      // alert(
      //   `Bid placed successfully! ${updatedPlayer.name} is now with ${updatedTeam.owner}.`
      // );
      notify(`Bid placed successfully! ${updatedPlayer.name} is now with ${updatedTeam.owner}.`)
      nextPlayer(); // Move to the next player after a successful bid
      setTimer(0);
      setIsBidding(false);
    } catch (err) {
      alert("Failed to place bid. " + err.response.data);
    }
    finally {
      setIsFinalizing(false); // Reset the flag in finally block
  }
  };

  useEffect(() => {
    let countdown;
    if (isBidding && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            FinalizeBid();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(countdown);
      setIsFinalizing(false); // Ensure flag is reset if effect cleans up
  };
  }, [isBidding, timer]);

  const submitAuction = () => {
    const slabs = ["A", "B", "C", "D", "E"];

    slabs.forEach((slab) => {
      const teamsWithPlayers = teams.filter(
        (team) => team.playerCount[slab] >= 2
      );

      if (teamsWithPlayers.length >= 2) {
        // Find remaining players in this slab
        const remainingPlayers = players.filter(
          (player) => player.slab === slab && player.status === "available"
        );

        remainingPlayers.forEach((player) => {
          // Assign player to the third team if available
          const thirdTeam = teams.find(
            (team) => !teamsWithPlayers.includes(team)
          );
          if (thirdTeam && thirdTeam.units >= player.basePrice) {
            thirdTeam.players.push(player);
            thirdTeam.units -= player.basePrice;
            player.status = "sold"; // Update player status
            thirdTeam.playerCount[slab]++;
          }
        });

      }

      

      navigate("/auctionresult");
    });

    // Further logic for the auction submission can go here
  };

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const currentPlayer = players[currentIndex];

  return (
    <div className="player-bid-page">
      {/* <h1>Welcome To Auction</h1> */}
      <h2>Current Player</h2>
      <div className="player-details">
        <h2>{currentPlayer.name}</h2>
        <p>Slab: {currentPlayer.slab}</p>
        <p>Base Price: {currentPlayer.basePrice} units</p>
        <p>Status: {currentPlayer.status}</p>
        <p>Current Bid: {currentPlayer.currentBid}</p>
      </div>

      <h2>Bid Amount:</h2>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(Number(e.target.value))}
        min={currentPlayer.basePrice}
        max={currentPlayer.maxBid}
      />
      <div>
        <button onClick={PlaceBid}>Place Bid</button>
        {isBidding && <div>Time Remaining: {timer} seconds</div>}
      </div>
      <h2>Select Team to Bid:</h2>
      <div className="team-list">
        {filteredTeams.map((team) => (
          <div className="team-card" key={team.id}>
            <h3>{team.owner}</h3>
            <div>Units available </div>
            <div>{team.units}</div>
            <button
              onClick={() => {
                setCurrentTeamId(team.id);
                setBidAmount(0);
              }}
            >
              {currentTeamId === team.id ? "Selected" : "Select"}
            </button>
          </div>
        ))}
      </div>

      <button onClick={FinalizeBid}>Finalize Bid</button>
      <button onClick={nextPlayer}>Next Player</button>
      <button onClick={submitAuction}>Submit</button>
    </div>
  );
}

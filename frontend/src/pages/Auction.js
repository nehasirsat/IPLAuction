import { useEffect, useState } from "react";
import BidsTable from "../components/BidsTable";
import CurrentBid from "../components/CurrentBid";
import PlayerList from "../components/PlayerList";
import TeamList from "../components/TeamList";
import axios from 'axios'
import "../styles/auction.css";

export default function Auction() {

    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [biddingTeam, setBiddingTeam] = useState(null)
    const [currBid, setCurrBid] = useState(0);

    useEffect(() => {
      const loadPlayers = async() => {
        const response = await axios.get(`http://localhost:5000/players`)
        console.log(response.data)
        setPlayers(response.data);
      }

      const loadTeams = async() => {
        const response1 = await axios.get(`http://localhost:5000/teams`)
        console.log(response1.data)
        setTeams(response1.data);
      }
      loadPlayers();
      loadTeams();
      
    }, []);

  return (
    <>
      <div className="auction-page">
        <div>
          <CurrentBid
            player={selectedPlayer}
            team={biddingTeam}
            currBidAmt={currBid}
          />
        </div>

        <div className="players-teams">
          <div className="player-list">
            <PlayerList players={players} selectPlayer={setSelectedPlayer} resetBid={setCurrBid}/>
          </div>
          
          <div className="team-list">
            <TeamList teams={teams} selectedTeam={biddingTeam} selectBiddingTeam={setBiddingTeam} setBid={setCurrBid} bid={currBid} selectedPlayer={selectedPlayer}/>
          </div>
        </div>

        <div className="bids-table">
          <BidsTable bids={[]} />
        </div>
      </div>
    </>
  );
}

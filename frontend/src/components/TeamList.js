import { useState, useEffect } from "react";
import Team from "../cards/Team";
import "../styles/teamList.css"; // Import the new CSS
import axios from 'axios';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:5000/teams'); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        const data = await response.json();
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="teams-page">
      <h1>Teams</h1>
      <div className="teams-list">
        {teams.map((team) => (
          <div className="team-card" key={team.id}>
            <h3>{team.owner}</h3>
            <div>Units available: {team.units}</div>
            <div>Players: {team.players.length}</div>
            <div>Players by Slab:</div>
            <ul>
              {Object.entries(team.playerCount).map(([slab, count]) => (
                <li key={slab}>{slab}: {count}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;

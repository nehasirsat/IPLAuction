import Player from "../cards/Player";
import "../styles/playerList.css"

export default function PlayerList({players, selectPlayer, resetBid}) {
  

  return (
    <div >
      <h1>Players</h1>
      <div className="player-list">
      <div>
      {players.map((player) => (
        <>
        <Player player={player} />
        <button onClick={(e)=>{
          console.log("Selected-")
          console.log(player)
          resetBid(0)
          selectPlayer(player)}}>Select</button></>
      ))}
      </div>
      </div>
    </div>
  );
}

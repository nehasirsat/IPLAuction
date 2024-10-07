import { useEffect, useState } from "react";

export default function CurrentBid({ player, team, currBidAmt }) {
  //??
  if(player === null) {
    return <div>No player selected</div>
  }



  return (
    <div className="CurrentBid">
      <div>{ player.name}</div>
      <div>{currBidAmt || 0}</div>
      <div>{player.basePrice}</div>
      <div>{team && team.owner}</div>
    </div>
  );
}

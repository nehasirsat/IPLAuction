import '../styles/Player.css'

export default function Player({ player }) {
    
    
    return (
            <div className='Player-card'>
                <div className="player-name">{player.name}</div>
                <div>{player.basePrice}</div>
                <div>{player.slab}</div>
                <div>{player.maxBid}</div>
                <div>{player.status}</div>
            </div>

    )
}
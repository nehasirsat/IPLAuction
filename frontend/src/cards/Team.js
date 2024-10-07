import '../styles/team.css'

export default function Team({team}) {
    return (
        <div className="team-card">
            
            <div >{team.id}</div>
            <div className='team-name'>{team.owner}</div>
            
            <div className='team-units'>
            <div>Units available </div>
            <div >{team.units}</div>
            </div>
            <button className='team-button'>Show current players</button> 

        </div>
    )
}
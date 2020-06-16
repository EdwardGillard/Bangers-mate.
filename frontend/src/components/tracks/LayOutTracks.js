import React from 'react'
import { Link } from 'react-router-dom'



const LayOutTracks = ({ _id, artist, trackName, bandPictureUrl }) => {
  return (
    <div className="column">
      <Link to={`tracks/${_id}`}>
        <div className="card fade-in">
          <div>
            <h2>{trackName}</h2>
            <h3>{artist}</h3>
          </div>
          <div className="card-image">
            <img src={bandPictureUrl} alt={artist} />
          </div>
        </div>
      </Link>
    </div>
  )
}




export default LayOutTracks
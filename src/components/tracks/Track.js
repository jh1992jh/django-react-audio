import React from 'react';
import ShareTrack from './ShareTrack';

const Track = ({ track }) => {
  return (
    <div className="track">
        <img src={track.albumCoverSrc} alt="album-cover"/>
        <div className="track-info">
            <h3>
                {track.title}
            </h3>

            <p className="genre">{track.genre}</p>
            <p>    
                {track.albumTitle}
                <span className="separator">-</span>
                {track.artistTitle}
            </p>
            <ShareTrack trackId={track.id} />
        </div>
    </div>
  )
}



export default Track;
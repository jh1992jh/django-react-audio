import React from 'react';

const SharedTrackBasicInfo = ({track}) => (
    <div className="share-track-basic-info">
        <span>Title: {track.title} </span>
        <span>Album: {track.albumTitle}</span>
        <span>Artist: {track.artistTitle}</span>
        <span>Genre: {track.genre}</span>
        <span>Length: {track.trackTimeMins}:{track.trackTimeSecs}</span>
    </div>
)

export default SharedTrackBasicInfo;
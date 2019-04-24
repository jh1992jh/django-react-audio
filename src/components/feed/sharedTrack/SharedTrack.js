import React from 'react';
import ReactPlayer from 'react-player';
import SharedTrackHeader from './SharedTrackHeader';
import SharedTrackImg from './SharedTrackImg';
import SharedTrackBasicInfo from './SharedTrackBasicInfo';
import SharedTrackDescription from './SharedTrackDescription';
import Comments from '../comments/Comments';

const SharedTrack = ({ track }) => {
  return (
    <div className="shared-track">
      <SharedTrackHeader track={track} />
      <SharedTrackImg trackImg={track.track.albumCoverSrc} />
      <ReactPlayer url={track.track.audioSrc} controls={true} width="100%" height="30px" />
      <SharedTrackBasicInfo track={track.track} />
      <SharedTrackDescription description={track.track.description} />
      <Comments track={track} />
    </div>
  )
}

export default SharedTrack;
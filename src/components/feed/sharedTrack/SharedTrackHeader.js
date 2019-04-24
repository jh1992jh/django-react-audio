import React, { useContext } from 'react';
import { UserContext } from '../../../App';
import UnshareTrack from './UnshareTrack';

const SharedTrackHeader = ({track}) => {
  const currentUser = useContext(UserContext);
  const isCurrentUser = currentUser.id === track.user.id;
  

  return (
    <div className="shared-track-header">
        <div className="left-part">
            <img className="profile-pic" src={track.user.profilePic} alt="avatar" />
            <span className="username">{track.user.username}</span>
        </div>

        <div className="shared-header-text">
          <span>shared track</span>
          <span>{track.track.title}</span>
        </div>
      {isCurrentUser && <UnshareTrack sharedTrackId={track.id} />}
    </div>
  )
}

export default SharedTrackHeader;
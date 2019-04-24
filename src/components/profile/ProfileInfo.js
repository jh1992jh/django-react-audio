import React, { useState } from 'react';
import EditProfile from './EditProfile';

const ProfileInfo = ({ profile, profileId, currentUserId }) => {
    const [editProfileOn, toggleEditProfile] = useState(false);
    return (
        <div className="profile-column">
            <span className="profile-title" >Favorite Song: </span >
            <p>{profile.favSong}</p>
            <span className="profile-title" >Favorite Artist: </span >
            <p>{profile.favArtist}</p>
            <span className="profile-title" >Favorite Genre:</span >
            <p>{profile.favGenre}</p>
            <span className="profile-title description" >Description: </span >
            <p>{profile.description}</p>
            {currentUserId === profileId ? <button onClick={() => toggleEditProfile(true)}>Edit Profile</button> : null}
            {editProfileOn && <EditProfile toggleEditProfile={toggleEditProfile} profile={profile} />}
        </div>    
    )
}

export default ProfileInfo;
import React from 'react';
import format from 'date-fns/format';

const ProfileOverview = ({ profile }) => (
    <div className="profile-column prof-basic-info">
        <img src={profile.profilePic} alt="avatar"/>
        <h3>{profile.username}</h3>
        <span>Joined: </span>
        {format(profile.dateJoined, 'Do MMM YYYY')}
    </div>    
)

export default ProfileOverview;
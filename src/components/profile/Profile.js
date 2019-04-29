import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import ProfileOverview from './ProfileOverview';
import ProfileInfo from './ProfileInfo';

const Profile = ({ match, currentUser }) => {
    const id = match.params.id;
    window.scrollTo(0,0);
    return (
        <Query query={USER_QUERY} variables={{id}}>
            {({data, loading, error}) => {

                if(loading) return <h3>Loading</h3>
                if(error) console.log(error);

                return (
                    <div className="profile">
                        <div className="profile-wrapper">
                            <ProfileOverview profile={data.user} />
                            <ProfileInfo currentUserId={currentUser.id} profileId={id} profile={data.user} />
                        </div>
                    </div>
                )
            }}
        </Query>
    )
}

const USER_QUERY = gql`
    query ($id: Int!) {
        user (id: $id) {
            id
            username
            dateJoined
            profilePic
            favSong
            favArtist
            favGenre
            description
        }
    }
`

export default withRouter(Profile);
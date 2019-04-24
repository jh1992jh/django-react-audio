import React from 'react'
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import SharedTrack from './sharedTrack/SharedTrack';


const Feed = () => {
  return (
    <Query query={SHARED_QUERY}>
      {({ data, loading, error}) => {
        if (loading) return <h3>Loading</h3>
        if(error) console.log(error)

        const sharedTracks = data.shared;
        return (
          <div className="feed">
            {sharedTracks.map(track => (
              <SharedTrack track={track} key={track.track.id} />
            ))}
          </div>
        )
      }}
    </Query>
  )
}

export const SHARED_QUERY = gql`
  {
    shared {
      id
      track {
        id
        title
        description
        audioSrc
        albumCoverSrc
        albumTitle
        artistTitle
        genre
        trackTimeMins
        trackTimeSecs
        trackNumber
        likes {
          id
        }
        comments {
          id
          user {id, username, profilePic}
          track {title}
          commentText
        }
      }
      user {
        username
        profilePic
        id
      }
      
    }
  }
`;

export default Feed;
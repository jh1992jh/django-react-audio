import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { SHARED_QUERY } from '../feed/Feed';

const ShareTrack = ({trackId}) => {
  return (
    <Mutation mutation={SHARE_TRACK_MUTATION} variables={{trackId: trackId}} onCompleted={() => console.log('Track shared')} refetchQueries={() => [{ query: SHARED_QUERY }]}>
        {(shareTrack, {loading, error}) => {
            if (loading) console.log('Loading the track')
            if (error) console.log(error)

            return (
                <button onClick={shareTrack}>Share</button>
            )
        }}
    </Mutation>
  )
}

const SHARE_TRACK_MUTATION = gql`
    mutation ($trackId: Int!) {
        shareTrack(trackId: $trackId) {
            user {
                username
            }
            track {
                title
            }
        }
    }
`

export default ShareTrack; 
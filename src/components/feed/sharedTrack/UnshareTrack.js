import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { SHARED_QUERY } from '../Feed';

const UnshareTrack = ({ sharedTrackId }) => {
    return (
        <Mutation mutation={UNSHARE_TRACK_MUTATION} variables={{sharedTrackId}} onCompleted={() => console.log('Unshared the track...')} refetchQueries={() => [{ query: SHARED_QUERY }]}>
        {(unshareTrack, { loading, error}) => {
            if(loading) console.log('Unsharing the track...')
            if(error) console.log(error)
            return(
                <button className="unshare" onClick={() => unshareTrack(sharedTrackId)}>Unshare</button>
            )   
        }}

        </Mutation>
    )
}

const UNSHARE_TRACK_MUTATION = gql`
    mutation ($sharedTrackId: Int!) {
        unshareTrack(sharedTrackId: $sharedTrackId) {
            sharedTrackId
        }
    }
`

export default UnshareTrack;
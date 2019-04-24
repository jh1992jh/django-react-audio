import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Track from './Track';
import PageIndicators from './PageIndicators';


const Tracks = () => {
  const [selectedGenre, setGenre] = useState("All");
  return (
    <Query query={TRACKS_QUERY}> 
      {({data, loading, error}) => {
        if (loading) return <h3>Loading</h3>
        if (error) console.log(error);
        
        const tracks = data.tracks
        const genres = ['All', 'Pop', 'EDM', 'Video Game'];
        // let filteredTracks;
        // tracks.filter()
        let filteredTracks;
        if(selectedGenre !== 'All') {
          filteredTracks = tracks.filter(track => track.genre === selectedGenre)
        } else {
          filteredTracks = tracks
        }
        return (
          <div className="tracks">
            {filteredTracks.map(track => <Track key={track.id} track={track} />)}
            <PageIndicators genres={genres} selectedGenre={selectedGenre} setGenre={setGenre} />
          </div>
        )
      }}
    </Query>
  )
}

const TRACKS_QUERY = gql`
  {
    tracks {
      id 
      title
      albumTitle
      artistTitle
      albumCoverSrc
      genre
      trackTimeMins
      trackTimeSecs
    }
  }
`


export default Tracks;
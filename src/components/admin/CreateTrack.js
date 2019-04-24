import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import axios from 'axios';

const CreateTrack = ({}) => {
    const [title, setTitle] = useState("");
    const [albumTitle, setAlbumTitle] = useState("");
    const [artistTitle, setartistTitle] = useState("");
    const [description, setDescription] = useState("")
    const [genre, setGenre] = useState("")
    const [audioSrc, setAudioSrc] = useState("")
    const [albumCoverSrc, setAlbumCoverSrc] = useState("")
    const [trackTimeMins, setTrackTimeMins] = useState("")
    const [trackTimeSecs, setTrackTimeSecs] = useState("")
    const [trackNumber, setTrackNumber] = useState("");

    const handleAudioChange = e => {
        const selectedFile = e.target.files[0];
        const fileSizeLimit = 10000000;
        
        if(selectedFile && selectedFile.size > fileSizeLimit) {
            console.log("File size too large")
        } else {
            setAudioSrc(selectedFile)
        }
    }

    const handleImageChange = e => {
        const selectedFile = e.target.files[0];
        const fileSizeLimit = 10000000;
        
        if(selectedFile && selectedFile.size > fileSizeLimit) {
            console.log("File size too large")
        } else {
            setAlbumCoverSrc(selectedFile)
        }
    }

    const handleAudioUpload = async () => {
        try {
          const data = new FormData()
          data.append('file', audioSrc);
          data.append('resource_type', 'raw')
          data.append('upload_preset', 'react-tracks')
          data.append('cloud_name', 'jhm-cloudi')
          const res = await axios.post('https://api.cloudinary.com/v1_1/jhm-cloudi/raw/upload', data)
          console.log(res, 'Audio file')
          return res.data.url
        } catch (err) {
          console.error('Error uploading file', err)
        }
      }

      const handleImageUpload = async () => {
        try {
          const data = new FormData()
          data.append('file', albumCoverSrc);
          data.append('resource_type', 'raw')
          data.append('upload_preset', 'react-tracks')
          data.append('cloud_name', 'jhm-cloudi')
          const res = await axios.post('https://api.cloudinary.com/v1_1/jhm-cloudi/raw/upload', data)
          console.log(res, 'Img file')
          return res.data.url
        } catch (err) {
          console.error('Error uploading file', err)
        }
      }

      const handleSubmit = async (e, createTrack) => {
        e.preventDefault();
       
        // upload audio file and get returned url
        const uploadedUrlAudio = await handleAudioUpload()
        const uploadedUrlAlbumCover = await handleImageUpload()
        createTrack({ variables: { title, albumTitle, genre, artistTitle, description, audioSrc: uploadedUrlAudio, albumCoverSrc: uploadedUrlAlbumCover, trackTimeMins, trackTimeSecs, trackNumber}})
      }


  return (
    <Mutation mutation={CREATE_TRACK_MUTATION} onCompleted={() => console.log("Mutation complete")}>
        {(createTrack, { loading, error}) => {
            if (loading) return <h3>Loading</h3>
            if (error) console.log(error)
            return (
               <form className="upload" onSubmit={e => handleSubmit(e, createTrack)}>
                <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title" />
                <input id="albumTitle" type="text" value={albumTitle} onChange={e => setAlbumTitle(e.target.value)} placeholder="albumTitle" />
                <input id="artistTitle" type="text" value={artistTitle} onChange={e => setartistTitle(e.target.value)} placeholder="artistTitle" />
                <textarea name="description" id="description" cols="30" rows="10" value={description} onChange={e => setDescription(e.target.value)} placeholder="description"></textarea>
                <input type="text" id="genre" value={genre} onChange={e => setGenre(e.target.value)} placeholder="genre" />
                <input type="file" name="audioSrc" id="audioSrc"  onChange={handleAudioChange} placeholder="audioSrc"/>
                <input type="file" name="albumCoverSrc" id="albumCoverSrc" onChange={handleImageChange} placeholder="albumCoverSrc"/>
                <input type="number" name="trackTimeMins" id="trackTimeMins" value={trackTimeMins} onChange={e => setTrackTimeMins(e.target.value)} placeholder="trackTimeMins"/>
                <input type="number" name="trackTimeSecs" id="trackTimeSecs" value={trackTimeSecs} onChange={e => setTrackTimeSecs(e.target.value)} placeholder="trackTimeSecs" />
                <input type="number" name="trackNumber" id="trackNumber" value={trackNumber} onChange={e => setTrackNumber(e.target.value)} placeholder="trackNumber" />
                <button type="submit">Submit</button>
               </form>
            )
        }}
    </Mutation>
  )
}

const CREATE_TRACK_MUTATION = gql`
mutation ($title: String!, $albumTitle: String!, $genre: String!, $artistTitle: String!, $description: String!, $audioSrc: String!, $albumCoverSrc: String!, $trackTimeMins: Int, $trackTimeSecs: Int, $trackNumber: Int){
    createTrack(
      title: $title,
      albumTitle: $albumTitle,
      artistTitle: $artistTitle,
      genre: $genre,
      description: $description,
      audioSrc: $audioSrc,
      albumCoverSrc: $albumCoverSrc,
      trackTimeMins: $trackTimeMins,
      trackTimeSecs: $trackTimeSecs,
      trackNumber: $trackNumber
    ) {
      track {id,title, albumTitle, description, audioSrc, albumCoverSrc, trackTimeMins, trackTimeSecs}
    }
  }
`

export default CreateTrack;
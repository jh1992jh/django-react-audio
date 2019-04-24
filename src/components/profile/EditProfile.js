import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import axios from 'axios';
import ReactLoading from 'react-loading';

const EditProfile = ({ toggleEditProfile, profile }) => {
    const [profilePic, setProfilePic] = useState(profile.profilePic);
    const [previewProfilePic, setPreviewProfilePic] = useState(profile.profilePic);
    const [favSong, setFavSong] = useState(profile.favSong);
    const [favArtist, setFavArtist] = useState(profile.favArtist);
    const [favGenre, setFavGenre] = useState(profile.favGenre);
    const [description, setDescription] = useState(profile.description);

    const handleEditProfileToggle = (e) => {
            if (e.target.className === "edit-profile-modal-background") {
                toggleEditProfile(false)
            } else if (e.target.className === "cancel-btn") {
                toggleEditProfile(false)
            } else {
                toggleEditProfile(true)
            }
    }

    const handleImgChange = e => {
      const selectedFile = e.target.files[0];
      const fileSizeLimit = 10000000;

      if(selectedFile && selectedFile.size > fileSizeLimit) {
        console.log('File too large')
      } else {
        setProfilePic(selectedFile);
        setPreviewProfilePic(URL.createObjectURL(e.target.files[0]))
      }
    }

    const handleImgUpload = async () => {
      try {
        const data = new FormData()
        data.append('file', profilePic);
          data.append('resource_type', 'raw')
          data.append('upload_preset', 'react-tracks')
          data.append('cloud_name', 'jhm-cloudi')
          const res = await axios.post('https://api.cloudinary.com/v1_1/jhm-cloudi/raw/upload', data);
          return res.data.url;
      } catch(err) {
        console.log(err)
      }
    }

    const handleSubmit = async (e, editProfile) => {
      e.preventDefault();
      const profilePicUrl = await handleImgUpload();

       /*
    profilePic 
    favSong
    favArtist
    favGenre
    description
    */
      editProfile({ variables: { userId: profile.id, profilePic: profilePicUrl, favSong, favArtist, favGenre, description}})
    }

  return (
    <div className="edit-profile-modal-background" onClick={e => handleEditProfileToggle(e)}>
      <div className="edit-profile-modal">
        <Mutation mutation={EDIT_PROFILE_MUTATION} onCompleted={() => toggleEditProfile(false)}>
          {(editProfile, { loading, error }) => {
            if (loading) return <ReactLoading type="bars" color="#006989" className="loading" />
            if (error) console.log(error);

            return (
              <form className="edit-profile-form" onSubmit={e => handleSubmit(e, editProfile)}>
                {previewProfilePic !== null ? <img src={previewProfilePic} alt="avatar" /> : <div className="profile-pic-placeholder" />}
                <input type="file" id="profilePic" onChange={handleImgChange} accept="image/*" />
                <input type="text" id="favSong" value={favSong} onChange={e => setFavSong(e.target.value)} placeholder="Favorite Song" />
                <input type="text" id="favArtist" value={favArtist} onChange={e => setFavArtist(e.target.value)} placeholder="Favorite Artist" />
                <input type="text" id="favGenre" value={favGenre} onChange={e => setFavGenre(e.target.value)} placeholder="Favorite Genre" />
                <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} cols="30" rows="5" placeholder="Description"></textarea>

                <div className="buttons">
                    <button type="submit">Save</button>
                    <button className="cancel-btn">Cancel</button>
                </div>
              </form>
            )
          }}
        </Mutation>
      </div>
    </div>
  )
}

const EDIT_PROFILE_MUTATION = gql`
  mutation($userId: Int!, $profilePic: String, $favSong: String, $favArtist: String, $favGenre: String, $description: String ) {
    editProfile(userId: $userId, profilePic: $profilePic, favSong: $favSong, favArtist: $favArtist, favGenre: $favGenre, description: $description) {
      user {
        id
        profilePic
        favSong
        favArtist
        favGenre
        description
      }      
    }
  }
`

export default EditProfile; 
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Navbar from './components/navbar/Navbar';
import Tracks from './components/tracks/Tracks';
import Feed from './components/feed/Feed';
import Profile from './components/profile/Profile';
import CreateTrack from './components/admin/CreateTrack';

export const UserContext = React.createContext();

class App extends Component {
  render() {
    return (
      <Query query={ME_QUERY} fetchPolicy="cache-and-network">
        {({ data, loading, error}) => {
          if (loading) return <ReactLoading type="bars" color="#006989" className="loading" />
          if (error) console.log(error)

          const currentUser = data.me

          return(
            <Router>
              <UserContext.Provider value={currentUser}> 
                <Navbar currentUser={currentUser}/>
                <Route exact path="/" component={CreateTrack} />
                <Route exact path="/tracks" component={Tracks} />
                <Route exact path="/profile/:id" render={() => <Profile currentUser={currentUser} />} />
              </UserContext.Provider>
            </Router>
          )
        }} 
      </Query>
    );
  }
}

export const ME_QUERY = gql`
  {
    me {
      id
      username
      email
      profilePic

      likeSet {
        track {
          id
        }
      }
    }
  }
`

export default App;

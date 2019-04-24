import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';
import Logo from '../../logo.png'
 
const Navbar = ({ currentUser }) => {
    const handleSignout = client => {
        localStorage.removeItem('reactAudioAuth');
        client.writeData({ data: { isLoggedIn: false }})
    }

    return (
    <nav className="navbar">
        <div className="left-part">
            <Link to="/">
              <img src={Logo} alt="logo"/>
            </Link>
            <Link to="/tracks">Tracks</Link>
        </div>
        <div className="right-part">
            <img className="profile-pic" src={currentUser.profilePic} alt="avatar" />
            <Link to={`/profile/${currentUser.id}`}>
              <span className="username">{currentUser.username}</span>
            </Link>
            <ApolloConsumer>
              {client => (
                <button onClick={() => handleSignout(client)}>Signout</button>
              )}
            </ApolloConsumer>
        </div>
    </nav>
  )
}

export default Navbar;

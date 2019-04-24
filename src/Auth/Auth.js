import React, { useState, Fragment } from 'react'
import Login from './Login';
import Register from './Register';
import Logo from '../logo.png';
const Auth = () => {
  const [showLogin, setLogin] = useState(true);
  return (
    <div className="auth">
        <img src={Logo} alt="logo" />
        {showLogin ? (
          <Fragment>
            <h3>Login</h3>
            <Login />
            <button onClick={() => setLogin(false)}>New User? Click Here!</button>
          </Fragment>
        ) : (
          <Fragment>
            <h3>Register</h3>
            <Register setLogin={setLogin}/>
            <button onClick={() => setLogin(true)}>Previous User? Click Here!</button>
          </Fragment>
        )}
    </div>
  )
}

export default Auth;
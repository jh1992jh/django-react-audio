import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e, tokenAuth, client) => {
      e.preventDefault();
      const res = await tokenAuth();
      localStorage.setItem('reactAudioAuth', res.data.tokenAuth.token);
      client.writeData({ data: { isLoggedIn: true }});
  } 
  return (
    <Mutation mutation={LOGIN_MUTATION} variables={{username, password}}>
        {(tokenAuth, {loading, error, called, client}) => {
            if (error) console.log(error)
            
            return (
                <form onSubmit={e => handleSubmit(e, tokenAuth, client)}>
                    <input id="username" value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="username"/>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password"/>
                    <button type="submit">Submit</button>
                </form>
            )
        }}
    </Mutation>
  )
}


const LOGIN_MUTATION = gql`
    mutation ($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }
`
export default Login; 
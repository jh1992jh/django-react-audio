import React,{ useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';


const Register = ({ setLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <Mutation mutation={REGISTER_MUTATION} variables={{username, password, email}} onCompleted={() => setLogin(true)}>
        {(createUser, { data, error }) => {
            if (error) console.log(error)

            const handleSubmit = async(e, createUser) => {
                e.preventDefault();

                const res = await createUser();
                console.log(res.data)
            }
            return (
                <form onSubmit={e => handleSubmit(e, createUser)}>
                    <input id="username" value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="username"/>
                    <input id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email"/>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password"/>
                    <button type="submit">Submit</button>
                </form>
            ) 
        }}
    </Mutation>
  )
}

const REGISTER_MUTATION = gql`
    mutation($username: String!, $password: String!, $email: String!) {
        createUser(username: $username, password: $password, email: $email) {
            user {
                username
                email
            }
        }
    }
`


export default Register;
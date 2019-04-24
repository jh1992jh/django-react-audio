import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';
import Auth from './Auth/Auth'
import './index.css';
import './app.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
    uri: 'https://django-react-audio.herokuapp.com/graphql/',
    fetchOptions: {
        credentials: "include"
    },
    request: operation => {
        const token = localStorage.getItem('reactAudioAuth') || "";

        operation.setContext({
            headers: {
                Authorization: `JWT ${token}`
            }
        })
    },
    clientState: {
        defaults: {
            isLoggedIn: !!localStorage.getItem('reactAudioAuth')
        }
    }
});

const IS_LOGGED_IN_QUERY = gql`
    query {
        isLoggedIn @client
    }
`;

ReactDOM.render(
    <ApolloProvider client={client}>
        <Query query={IS_LOGGED_IN_QUERY}>
            {({data}) => data.isLoggedIn ? <App /> : <Auth />}
        </Query>
    </ApolloProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

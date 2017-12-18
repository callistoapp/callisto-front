import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { ApolloProvider } from 'react-apollo';


const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'http://localhost:8080/graphql',
    }),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router />
    </ApolloProvider>,
    document.getElementById('root')
);
registerServiceWorker();

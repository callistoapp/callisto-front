import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://api.callisto.com/graphql', credentials: "include" }),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router />
    </ApolloProvider>,
    document.getElementById('root')
);
registerServiceWorker();

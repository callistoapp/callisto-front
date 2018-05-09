import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import { onError } from "apollo-link-error";
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';

const httpLink = new HttpLink({ uri: 'http://api.callisto.com/graphql', credentials: "include" });

const errorLink = onError(({ response, graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);

  if (networkError.statusCode === 401)
    window.location = "http://auth.callisto.com/login"

});

const link = ApolloLink.from([
  errorLink,
  httpLink,
]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router />
    </ApolloProvider>,
    document.getElementById('root')
);
registerServiceWorker();

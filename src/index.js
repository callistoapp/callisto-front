import React from 'react';
import ReactDOM from 'react-dom';

import { onError } from "apollo-link-error";
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import DashboardLayout from './layouts/dashboard';
import MainLayout from './layouts/root';
import {Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from 'history';

import registerServiceWorker from './registerServiceWorker';
import "./assets/css/material-dashboard-react.css?v=1.2.0";

const history = createBrowserHistory();
const httpLink = new HttpLink({ uri: 'https://api.callisto.com/graphql', credentials: "include" });

const errorLink = onError(({ response, graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    if (networkError.statusCode === 401)
      window.location = "http://auth.callisto.com/login"
  }
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
      <Router history={history}>
        <Switch>
          <Route path='/p' component={DashboardLayout}/>
          <Route path='/' component={MainLayout}/>
        </Switch>
      </Router>
    </ApolloProvider>,
    document.getElementById('root')
);
registerServiceWorker();

import React from 'react';
import DashboardLayout from './layouts/dashboard';
import MainLayout from './layouts/root';
import {Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from 'history';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { onError } from "apollo-link-error";
import { InMemoryCache } from 'apollo-cache-inmemory';

// import { hot } from 'react-hot-loader'

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

const App = () => (
  <ApolloProvider client={client}>
      <Router history={history}>
        <Switch>
          <Route path='/p' component={DashboardLayout}/>
          <Route path='/' component={MainLayout}/>
        </Switch>
      </Router>
</ApolloProvider>
);

// export default hot(module)(App);
export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import CssBaseline from '@mui/material/CssBaseline';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <CssBaseline />
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);


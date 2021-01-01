import React from 'react';
import ReactDOM from 'react-dom';

import {ApolloClient, InMemoryCache, HttpLink, ApolloProvider} from "@apollo/client";
import './index.css';
import App from './App';

const GRAPHQL_ENDPOINT = "https://library-applicationn.herokuapp.com/";

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
    resultCaching: false
  }),
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT
  }),
  queryDeduplication: false
});




ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

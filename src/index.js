import React from 'react';
import ReactDOM from 'react-dom';

import {ApolloClient, InMemoryCache, HttpLink, ApolloProvider} from "@apollo/client";
import './index.css';
import App from './App';
import {theme , ChakraProvider, ThemeProvider, CSSReset} from "@chakra-ui/react";

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
      <ThemeProvider theme={theme}>
        <CSSReset/>
    <App />
    </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

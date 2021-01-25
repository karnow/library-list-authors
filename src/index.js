import React from 'react';
import ReactDOM from 'react-dom';

import {ApolloClient, InMemoryCache, HttpLink, ApolloProvider} from "@apollo/client";
import './index.css';
import App from './App';
// import {BrowserRouter as Router} from "react-router-dom";
import {theme , ThemeProvider, CSSReset} from "@chakra-ui/react";

const GRAPHQL_ENDPOINT = "https://library-applicationn.herokuapp.com/";

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: true,
    resultCaching: false,
    possibleTypes: {
      Anything: ["Book", "Author", "User"]
    }
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

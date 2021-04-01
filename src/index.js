import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {ApolloClient, InMemoryCache, HttpLink, ApolloProvider} from "@apollo/client";
import './index.css';
import App from './App';
import AuthProvider, { getAuthToken } from "./components/AuthProvider";
import {theme , CSSReset, ChakraProvider} from "@chakra-ui/react";

const GRAPHQL_ENDPOINT = "https://library-applicationn.herokuapp.com/";
const token = getAuthToken();
const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: true,
    resultCaching: false,
    possibleTypes: {
      Anything: ["Book", "Author", "User", "BookCopy"],
      Resource: ["Book", "Author", "User", "BookCopy"]
    }
  }),
  link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      headers: {
      Authorization: token ? `Bearer ${token}` : null
    },
    }),
    queryDeduplication: false
});



ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
    <ChakraProvider theme={theme}>
      
        <CSSReset />
        <AuthProvider>
          <App />
        </AuthProvider>

    
        </ChakraProvider>
        </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

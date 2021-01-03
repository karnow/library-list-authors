import { Box, Divider, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import AuthorsPage from './pages/AuthorsPage';
import UsersPage from "./pages/UsersPage";
import BooksPage from "./pages/BooksPage";
import {BrowserRouter as Router, Route, Link as Routerlink} from "react-router-dom";


function App() {
  return (
    <Router>
      <Flex direction="column" align="center" width="75%" mx="auto">
        <Flex align="center" justifyContent="space-between" width="100%">
        <Link to='/' as={Routerlink}>
      <Heading as="h1">Personal Library</Heading>
       </Link>
            <Flex>
              <Link to='/' as={Routerlink}>
            <Box as="span" margin="10px">Books</Box>
              </Link>
            
              <Link to='/authors' as={Routerlink}>
            <Box as="span" margin="10px">Authors</Box>
              </Link>
              <Divider orientation='vertical' />

              <Link to='/users' as={Routerlink}>
            <Box as="span" margin="10px">Users</Box>
              </Link>

              <Divider orientation='vertical' />

             
        </Flex>
            </Flex>
              <Route path='/' component={BooksPage} exact/>
      
              <Route path='/authors' component={AuthorsPage} />
              
              <Route path='/users' component={UsersPage}/>
                
      </Flex>
      
      </Router>
      
      );
    }
    export default App;
    
    
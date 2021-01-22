import { Box, Divider, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import AuthorsPage from './pages/AuthorsPage';
import UsersPage from "./pages/UsersPage";
import BooksPage from "./pages/BooksPage";
import {BrowserRouter as Router, Route, Link as Routerlink} from "react-router-dom";
import BookDetailsPage from "./pages/BookDetailsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import UserDetailsPage from "./pages/UserDetailsPage";


function App() {
  return (
    <Router>
      <Flex direction="column" align="center" width={["100%","75%","60%"]} mx="auto">
        <Flex direction={["column",null,"row"]} align="center" justifyContent="space-between" width="100%">
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

              {/* <Link to='/user/:userId' as={Routerlink}>
            <Box as="span" margin="10px">UserDetailsPage</Box>
              </Link> */}

              <Divider orientation='vertical' />
             
        </Flex>
            </Flex>
              <Route path='/' component={BooksPage} exact/>
              <Route path='/books/:bookId' component={BookDetailsPage} />
      
              <Route path='/authors' component={AuthorsPage} />
              <Route path='/author/:authorId' component={AuthorDetailsPage} />
              
              <Route path='/users' component={UsersPage}/>
              <Route path='/user/:userId' component={UserDetailsPage}/>
                
      </Flex>
      
      </Router>
      
      );
    }
    export default App;
    
    
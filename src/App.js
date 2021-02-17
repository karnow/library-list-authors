import { Box, Divider, Flex, Heading} from "@chakra-ui/react";
import React from "react";
import AuthorsPage from './pages/AuthorsPage';
import UsersPage from "./pages/UsersPage";
import BooksPage from "./pages/BooksPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import BookDetailsPage from "./pages/BookDetailsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import ResourcesPage from "./pages/ResourcesPage";
import ResourceDetailsPage from "./pages/ResourceDetailsPage";
import Link from "./components/Link";


function App() {
  return (
    <Router>
      <Flex direction="column" align="center" width={["100%","75%","60%"]} mx="auto">
        <Flex direction={["column",null,"row"]} align="center" justifyContent="space-between" width="100%">
        <Link to='/' >
      <Heading as="h1">Personal Library</Heading>
       </Link>
       
              <Flex>
              <Link to='/' >
            <Box as="span" margin="10px">Books</Box>
              </Link>
            
              <Link to='/authors' >
            <Box as="span" margin="10px">Authors</Box>
              </Link>
              <Divider orientation='vertical' />

              <Link to='/users' >
            <Box as="span" margin="10px">Users</Box>
              </Link>

              {/* <Link to='/admin/anything/:anyId' as={Routerlink}>
            <Box as="span" margin="10px">AnythingDetailsPage</Box>
              </Link> */}

              <Divider orientation='vertical' />
             
              </Flex>
            </Flex>
            <Routes>
              <Route path='/' element={<BooksPage/>} />
              <Route path='/books/search/' element={<BooksPage/>} />
              <Route path='/books/search/:searchQuery' element={<BooksPage/>} />
              <Route path='/books/:bookId' element={<BookDetailsPage/>} />
      
              <Route path='/authors' element={<AuthorsPage/>} />
              <Route path='/author/:authorId' element={<AuthorDetailsPage/>} />
              <Route path='/authors/search/' element={<AuthorsPage/>} />
              <Route path='/authors/search/:searchQuery' element={<AuthorsPage/>} />
              
              <Route path='/users' element={<UsersPage/>}/>
              <Route path='/user/:userId' element={<UserDetailsPage/>}/>
              <Route path='/users/search/' element={<UsersPage/>} />
              <Route path='/users/search/:searchQuery' element={<UsersPage/>} />
              
              
              <Route path='/admin/resources' element={<ResourcesPage/>}/>
              <Route path='/admin/resource/:anyId' element={<ResourceDetailsPage/>}/>
              </Routes>
      </Flex>
      
      
    
      </Router>
      );
      
    }
    export default App;
    
    
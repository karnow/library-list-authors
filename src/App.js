import {Flex} from "@chakra-ui/react";
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

import NewUserPage from "./pages/NewUserPage";
import EditUserPage from "./pages/EditUserPage";
import NewAuthorPage from "./pages/NewAuthorPage";
import EditAuthorPage from "./pages/EditAuthorPage";
import Header from "./components/Header"
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import CurrentUserDetailsPage from "./pages/CurrentUserDetailsPage"


function App() {
  return (
    
      <Flex
      direction="column"
      align="center"
      width={["100%", "75%", "60%"]}
      mx="auto"
    >
      <Header />
            <Routes>
              <Route path='/' element={<BooksPage/>} />
              <Route path='/books/search/' element={<BooksPage />} />
              <Route path="/me" element={<CurrentUserDetailsPage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/login' element={<LogInPage />} />
          
              <Route path='/books/search/:searchQuery' element={<BooksPage/>} />
              <Route path='/books/:bookId' element={<BookDetailsPage/>} />
      
              <Route path='/authors' element={<AuthorsPage/>} />
              <Route path='/author/:authorId' element={<AuthorDetailsPage/>} />
              <Route path='/authors/search/' element={<AuthorsPage/>} />
              <Route path='/authors/search/:searchQuery' element={<AuthorsPage />} />
              <Route path='/authors/new/' element={<NewAuthorPage/>} />
              <Route path='/authors/:authorId/edit' element={<EditAuthorPage/>} />
                  
              <Route path='/users' element={<UsersPage/>}/>
              <Route path='/user/:userId' element={<UserDetailsPage/>}/>
              <Route path='/users/search/' element={<UsersPage/>} />
              <Route path='/users/search/:searchQuery' element={<UsersPage />} />
              <Route path='/users/new/' element={<NewUserPage />} />
              <Route path="users/:userId/edit" element={<EditUserPage />} />
              
              
              <Route path='/admin/resources' element={<ResourcesPage/>}/>
              <Route path='/admin/resource/:anyId' element={<ResourceDetailsPage/>}/>
              </Routes>
      </Flex>
      

     
    
      
      );
      
    }
    export default App;
    
    
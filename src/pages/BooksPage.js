import React from 'react';
import {gql, useQuery} from "@apollo/client";
import Book from '../components/Book';
import { Flex } from '@chakra-ui/react';

const ALL_BOOKS_QUERY = gql`query GetAllBooks {
  books {
    title
    cover {
      url
    }
    author {
      name
    }
  }
}`


export default function BooksPage() {
 const { loading, error, data} = useQuery(ALL_BOOKS_QUERY);
 if (loading) {
     return <p>loading ...</p>
 }
 if (error) {
    return <p>Could not load books...</p>
 }

 const {books} = data;

return <Flex wrap="wrap" justifyContent="space-around"> 
    
  {books.map(book => <Book book={book}/>)}
  </Flex>

}
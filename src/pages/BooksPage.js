import React from 'react';
import {gql, useQuery} from "@apollo/client";
import Book, {BOOK_FIELDS_FRAGMENT} from '../components/Book';
import { Box } from '@chakra-ui/react';
import Link from '../components/Link';



const GET_BOOKS_QUERY = gql`query GetBooks {
  books {
    __typename
    ...bookFields
    
  }
}
${BOOK_FIELDS_FRAGMENT}
`

export default function BooksPage() {
 const { loading, error, data} = useQuery(GET_BOOKS_QUERY);
 if (loading) {
     return <p>loading ...</p>
 }
 if (error) {
    return <p>Could not load books...</p>
 }

 const {books} = data;

return (
    <Box w="100%">
  {books.map (book =>(
    <Link key={book.id} to={`/books/${book.id}`}>
      
    <Book {...book}/>
    </Link>
  ))}
</Box>
)

}
import React, { useState } from 'react';
import {gql, useQuery} from "@apollo/client";
import Book, {BOOK_FIELDS_FRAGMENT} from '../components/Book';
import { Box} from '@chakra-ui/react';
import Link from '../components/Link';


import SearchBox, {useSearchQuery} from '../components/SearchBox';
import SimplePagination from '../components/SimplePagination';



export const GET_BOOKS_QUERY = gql`
query GetBooks($searchQuery: String!, $pageNumber: Int = 1) {
  paginatedBooks(searchQuery: $searchQuery, pageSize: 3, pageNumber: $pageNumber) {
   __typename
   results{
   ...bookFields
   }
   pageInfo{
     currentPageNumber,
     previousPageNumber,
     nextPageNumber

   }
  }
}
${BOOK_FIELDS_FRAGMENT}
`;



export default function BooksPage() {
  const baseSearchPath ="/books/search/";
  const [searchQuery, handleSearchQueryChange] = useSearchQuery(baseSearchPath);
  
 
 const { loading, error, data, fetchMore} = useQuery(GET_BOOKS_QUERY, {
   variables: { searchQuery}
 });
 if (loading) {
     return <p>loading ...</p>
 }
 if (error) {
    return <p>Could not load books...</p>
 }

  const { paginatedBooks } = data;
  const { results: books, pageInfo } = paginatedBooks;
  
 const hasBooks = books.length > 0;

console.log(searchQuery)
return (
    <Box w="100%">
      
      <SearchBox searchQuery={searchQuery} onSearchQueryChange={handleSearchQueryChange} />

{hasBooks ? (
        <>
          {
      books.map(book => (
          <Link key={book.id} to={`/books/${book.id}`}>
            <Book {...book} />
          </Link>
      ))
        }
        <SimplePagination pageInfo={pageInfo} onPageChange={(pageNumber) => {
          fetchMore({
            variables: { pageNumber },
            updateQuery: (previousQueryResult, { fetchMoreResult }) => {
              console.log({ previousQueryResult, fetchMoreResult });
              if (!fetchMoreResult) {
                return previousQueryResult;
              }
              return fetchMoreResult;
            }
          })
          
        }} />
      </>
      ) : (
        <p>No books found</p>
      )}
</Box>
)

}
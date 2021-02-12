import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useParams } from "react-router";
import BookDetails, {BOOK_DETAILS_FIELDS_FRAGMENT} from "../components/BookDetails";
import BookCopy, { BOOK_COPY_FIELDS_FRAGMENT } from "../components/BookCopy";




const GET_BOOK_QUERY = gql`
  query GetBook($bookId: ID!) {
    book(id: $bookId) {
      __typename
      ...BookDetailFields
      copies {
        ...bookCopyFields
      }
    }
  }
  ${BOOK_DETAILS_FIELDS_FRAGMENT}
  ${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function BookDetailsPage() {
  const { bookId } = useParams();
  const { loading, error, data } = useQuery(GET_BOOK_QUERY, {
    variables: { bookId }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load book "{bookId}"</p>;
  }
  const { book } = data;
  
  return (
     
    <Box>
      
      <BookDetails book={book} /> 
      <Heading as="h3" size="lg" textAlign="center">
        Copies
      </Heading>
      <Flex wrap="wrap">
        {book.copies.map(bookCopy => <BookCopy key={bookCopy.id} bookCopy={bookCopy} showOwner showBorrower showActions/>)}

      </Flex>
    </Box> 
   
  );
}

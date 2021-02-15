import { gql, useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import React from "react";
import { BOOK_COPY_FIELDS_FRAGMENT } from './fragments';

const RETURN_BOOK_COPY_MUTATION = gql`
mutation ReturnBookCopy($bookCopyId: ID!) {
  returnBookCopy(id: $bookCopyId) {
    id
    ...bookCopyFields
  }
}
${BOOK_COPY_FIELDS_FRAGMENT}
`;
export default function BorrowButton({ borrowedBookCopy }) {

  const [returnBookcopy, {loading}]= useMutation(RETURN_BOOK_COPY_MUTATION, {variables: {bookCopyId: borrowedBookCopy.id}})
  return (
    <Button disabled={loading} onClick={returnBookcopy}>
      Return
    </Button>
  );
}

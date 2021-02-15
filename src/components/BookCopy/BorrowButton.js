import { gql, useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import React from "react";
import { BOOK_COPY_FIELDS_FRAGMENT } from './fragments';

const BORROW_BOOK_COPY_MUTATION = gql`
mutation BorrowBookCopy($bookCopyId: ID!) {
  borrowBookCopy(id: $bookCopyId) {
    id
    ...bookCopyFields

  }


}
${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function BorrowButton({ availableBookCopy }) {

const [borrowBookcopy, {loading}]= useMutation(BORROW_BOOK_COPY_MUTATION, {variables: {bookCopyId: availableBookCopy.id}})

  return (
    <Button disabled={loading} onClick={borrowBookcopy}>
      Borrow
    </Button>
  );
}
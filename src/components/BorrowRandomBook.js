import { gql, useMutation } from "@apollo/client";
import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { GET_USER_QUERY } from "../pages/UserDetailsPage";
import { BOOK_COPY_FIELDS_FRAGMENT } from './BookCopy/fragments';

const BORROW_RANDOM_BOOK_COPY_MUTATION = gql`
mutation BorrowBookCopy {
  borrowRandomBook{
    id
    ...bookCopyFields

  }


}
${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function BorrowRandomButton() {

  const toast = useToast();
  const [borrowBookcopy, { loading }] = useMutation(BORROW_RANDOM_BOOK_COPY_MUTATION, {
    
    onCompleted: () => {
      toast({
        title: "Success",
        description: "You've borrowed the book",
        status: "success",
        duration: 1000,
        position: "top",
        isClosable: true
      });
    },
    onError: error => {
      toast({
        title: "Could not borrow the book",
        description: error.message,
        status: "error",
        duration: 1000,
        position: "top",
        isClosable: true
      });
    },
    refetchQueries: ({ data }) => {
      return [
        {
          query: GET_USER_QUERY,
          variables: { userId: data.borrowRandomBook.borrower.id }
        }
      ];
    }

  });

  return (
    <Button disabled={loading} onClick={borrowBookcopy}>
      Borrow Random Book
    </Button>
  );
}
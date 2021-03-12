import { gql, useMutation } from "@apollo/client";
import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { GET_USER_QUERY } from "../../pages/UserDetailsPage";
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

  const toast = useToast();
  const [borrowBookcopy, { loading }] = useMutation(BORROW_BOOK_COPY_MUTATION, {
    variables: { bookCopyId: availableBookCopy.id },
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
      console.log(data)
      return [
        {
          query: GET_USER_QUERY,
          variables: { userId: data.borrowBookCopy.borrower.id }
        }
      ];
    }

  });

  return (
    <Button disabled={loading} onClick={borrowBookcopy}>
      Borrow
    </Button>
  );
}
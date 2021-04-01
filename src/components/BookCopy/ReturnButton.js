import { gql, useMutation } from "@apollo/client";
import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { BOOK_COPY_FIELDS_FRAGMENT } from './fragments';
import { GET_USER_QUERY } from '../../pages/UserDetailsPage';

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
  const toast = useToast();
  const [returnBookcopy, { loading }] = useMutation(RETURN_BOOK_COPY_MUTATION, {
    variables: { bookCopyId: borrowedBookCopy.id },
    onCompleted: () => {
      toast({
        title: "Success",
        description: "You've returned the book",
        status: "success",
        duration: 1000,
        position: "top",
        isClosable: true
      });
    },
    onError: error => {
      toast({
        title: "Could not return the book",
        description: error.message,
        status: "error",
        duration: 1000,
        position: "top",
        isClosable: true
      });
    },
    update: cache => {
      try {
        const cachedData = cache.readQuery({
          query: GET_USER_QUERY,
          variables: { userId: borrowedBookCopy.borrower.id }
        });
        const data = JSON.parse(JSON.stringify(cachedData));
        data.user.borrowedBookCopies = data.user.borrowedBookCopies.filter(
          bookCopy => bookCopy.id !== borrowedBookCopy.id
        );
        cache.writeQuery({
          query: GET_USER_QUERY,
          variables: { userId: borrowedBookCopy.borrower.id },
          data
        });
      } catch (error) {}
    }
    // refetchQueries: [
    //   {
    //     query: GET_USER_QUERY,
    //     variables: {userId: borrowedBookCopy.borrower.id}
    //   }
    // ]
  })
  return (
    <Button disabled={loading} onClick={returnBookcopy}>
      Return
    </Button>
  );
}

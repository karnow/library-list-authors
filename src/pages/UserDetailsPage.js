import React from "react";
import { Flex, Heading, Box, Grid, GridItem } from "@chakra-ui/react";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import UserDetails, { USER_DETAILS_FIELDS_FRAGMENT } from "../components/UserDetails";
import BookCopy from '../components/BookCopy';
import { BOOK_COPY_FIELDS_FRAGMENT } from '../components/BookCopy/fragments';
import BorrowRandomButton from '../components/BorrowRandomBook';
import AdminActions from '../components/AdminActions';
import ButtonLink from '../components/ButtonLink';
import UserDeleteButton from '../components/UserDeleteButton';
import ResetDataButton from "../components/ResetDataButton";




export const GET_USER_QUERY = gql`
  query GetBook($userId: ID!) {
    user(id: $userId)  {
    __typename
    ...userDetailFields
      ownedBookCopies {
    ...bookCopyFields
    }

    borrowedBookCopies {
    ...bookCopyFields 
    }
    
    }
  }
${USER_DETAILS_FIELDS_FRAGMENT}
${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function UserDetailsPage() {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load user "{userId}"</p>;
  }
  const { user } = data;
  if (!user) {
    return <p> User not found</p>
  }
  
  return (
  <>
    <Flex wrap="wrap" justify="space-around" marginBottom="40px">
        <UserDetails user={user} />
        
      </Flex>
      <BorrowRandomButton />
      <AdminActions>
            <ButtonLink to={`/users/${user.id}/edit`}>Edit user</ButtonLink>
        <UserDeleteButton userId={user.id} />
        <ResetDataButton/>
        </AdminActions>
      
    <Grid templateColumns="repeat(5, 1fr)" gap={2}>
      <GridItem colSpan={2} h="10">
        
      <Heading as="h6" size="lg" textAlign="center">
         Owner books
      </Heading>
        <Flex wrap="wrap">
         {user.ownedBookCopies.map(bookCopy => <BookCopy key={bookCopy.id} bookCopy={bookCopy} showOwner showBorrower showActions/>)}
        </Flex>
        </GridItem>

        
        
        <GridItem colStart={4} colEnd={6} h="10">
          <Heading as="h5" size="lg" textAlign="center">
        Borrowed books
       </Heading>
        <Flex wrap="wrap">
         {user.borrowedBookCopies.map(bookCopy => <BookCopy key={bookCopy.id} bookCopy={bookCopy} showOwner showBorrower showActions/>)}
        </Flex>
      </GridItem>
      </Grid>
      </>
    
  );
}


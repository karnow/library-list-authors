import { gql } from '@apollo/client';
import { Avatar, Flex, Heading } from '@chakra-ui/react';
import React from 'react';

export const USER_FIELDS_FRAGMENT = gql`
fragment userFields on User {
      id
      name
      avatar {
        image {
          url
        }
        color
      }
}`


export default function User ({user}) {

   return ( <Flex direction="column" align="center" m="3">
       <Avatar name={user.name} src={user.avatar.image.url} background={`${user.avatar.color}.500`} size="l" />
       <Heading>{user.name}</Heading>
        </Flex>
   )
}
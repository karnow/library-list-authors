import React from 'react';

import { Flex, Heading, Image } from "@chakra-ui/react";
import { gql } from '@apollo/client';

export const BOOK_FIELDS_FRAGMENT = gql`
fragment bookFields on Book {
  id
  title
  cover {
    url
  }
  author {
    name
  }
}`

export default function Book({id, title, cover, author}) {

return (
    <Flex bg="gray.50" align="center" margin="3" border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden" w="100%">
    <Image boxSize="100px" objectFit="cover" src={cover.url} alt={title}/>
    <Flex direction="column" mx="2" justify="center">
    <Heading size="md" color="gray.700">{title}</Heading>
    <Heading size="sm" color="gray.400">{author.name}</Heading>
    </Flex>
    </Flex>
)

}
import React from 'react';

import { Flex, Heading, Image } from "@chakra-ui/react";

export default function Book({book}) {

return (
    <Flex bg="gray.50" align="center" margin="3" border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden" w="100%">
    <Image boxSize="100px" objectFit="cover" src={book.cover.url} alt={book.title}/>
    <Flex direction="column" mx="2" justify="center">
    <Heading size="md" color="gray.700">{book.title}</Heading>
    <Heading size="sm" color="gray.400">{book.author.name}</Heading>
    </Flex>
    </Flex>
)

}
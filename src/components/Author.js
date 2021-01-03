import React from 'react';

import { Flex, Heading, Image } from "@chakra-ui/react";

export default function Author({author}) {

return (
    <Flex bg="gray.50" direction="column" align="center" margin="3" border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">
    <Image boxSize="200px" objectFit="cover" src={author.photo.url} alt={author.name}/>
    <Heading size="md" color="gray.700" marginY="3">{author.name}</Heading>

    </Flex>
)

}
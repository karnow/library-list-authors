import React from "react";
import { Flex, Heading, Image, Box } from "@chakra-ui/react";
import Link from "./Link";
import Book, {BOOK_FIELDS_FRAGMENT} from "./Book";
import { gql } from "@apollo/client";


export const AUTHOR_DETAILS_FIRLEDS_FRAGMENT =gql`
fragment authorDetailFields on Author {
    id
    name
    photo {
      url
    }
    bio
    books {
      __typename
      ...bookFields
    }
}
${BOOK_FIELDS_FRAGMENT}
`;


export default function AuthorDetails({ author }) {
  console.log(`jestem na authordetal author.name: ${author.name}`)
  return (
    <Flex m="3" overflow="hidden" direction="column" align="center">
      <Heading as="h2" size="lg" color="gray.700" my="3">
        {author.name}
      </Heading>
      <Box as="article">
        <Image
          w="40%"
          objectFit="cover"
          src={author.photo.url}
          float="left"
          mr="3"
        />
        <Box as="article">{author.bio}</Box>
      </Box>
      <Heading as="h3" size="sm">
        Books
      
      </Heading>
      {author.books.map(book => (
        <Link to={`/books/${book.id}`} key={book.id} w="100%">
          <Book {...book} author={author} />
        </Link>
      ))}
    </Flex>
  );
}

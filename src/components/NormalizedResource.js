import React from "react";
import { Stack, Image, Heading, Box } from "@chakra-ui/react";
import { gql } from "@apollo/client";

export const normalizeResource = resource => ({
  ...resource.nested,
  ...resource
})

export const NORMALIZED_RESOURCE_FIELDS_FRAGMENT =gql`
fragment normalizedResourceFields on Resource {
  ...on Author {
    name
    info: bio
    img: photo {
      url
    }
  }
  ...on User {
    name
    info
    nested: avatar {
      img: image{
        url
      }
    }
  }
  ...on Book {
    name: title
    info: description
    img: cover {
      url
    }
  }

  ...on BookCopy {
      nested: book {
      name: title
      info: description
      img: cover {
      url
      }
    }
  }
  
}
`;

const COLORS_BY_TYPENAME = {
  BookCopy: "purple.200",
  Book: "red.200",
  Author: "green.200",
  User: "blue.200"
};

function NormalizedResource({ normalizedResource }) {
  return (
    <Stack
      w="100%"
      my={3}
      bg={COLORS_BY_TYPENAME[normalizedResource.__typename]}
      p={3}
      overflow="hidden"
      rounded={5}
    >
      <Stack isInline>
        <Image
          boxSize="100px"
          rounded={5}
          objectFit="cover"
          src={normalizedResource.img && normalizedResource.img.url}
        />
        <Stack>
          <Heading as="h4" size="sm">
            {normalizedResource.__typename}
          </Heading>
          <Heading as="h3" size="md">
            {normalizedResource.name}
          </Heading>
          <Box
            as="article"
            w="300px"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {normalizedResource.info}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default NormalizedResource;
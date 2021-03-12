import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router";

import AuthorDetails, {AUTHOR_DETAILS_FIRLEDS_FRAGMENT} from "../components/AuthorDetails";





export const GET_AUTHOR_QUERY = gql`
  query GetAuthor($authorId: ID!) {
    author(id: $authorId) {
    __typename
    ...authorDetailFields
  }
}
${AUTHOR_DETAILS_FIRLEDS_FRAGMENT}
`;

export default function AuthorDetailsPage() {
    const { authorId } = useParams();
  const { loading, error, data } = useQuery(GET_AUTHOR_QUERY, {
    variables: { authorId }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load author "{authorId}"</p>;
  }
  const { author } = data;
  // console.log(`jestem na authorDetailsPage ${author.name}`);
  if (!author) {
    return <p>Author not found</p>
  }

  return (
    <Box>
        
       <AuthorDetails author={author}/> 
      
    </Box>
  );
}

import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router";
import AuthorDetails from "../components/AuthorDetails";


const GET_AUTHOR_QUERY = gql`
  query GetAuthor($authorId: ID!) {
    author(id: $authorId) {
        id
    name
    photo {
      url
    }
    bio
    books {
      id
      title
      cover {
        url
      }
    }
  }
}
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
    return <p>Could not load book "{authorId}"</p>;
  }
  const { author } = data;

  return (
    <Box>
        
       <AuthorDetails author={author}/> 
      
    </Box>
  );
}

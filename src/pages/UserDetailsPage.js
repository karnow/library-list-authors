import React from "react";
import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import UserDetails from "../components/UserDetails";

const GET_USER_QUERY = gql`
  query GetBook($userId: ID!) {
    user(id: $userId)  {
    id
    name
    email
    info
    avatar {
      image {
        url
      }
      color
    }
  }
  }
 
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
  return (
    <Flex wrap="wrap" justify="space-around">
      <UserDetails user={user} />
    </Flex>
  );
}


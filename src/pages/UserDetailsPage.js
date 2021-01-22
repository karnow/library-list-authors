import React from "react";
import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import UserDetails, {USER_DETAILS_FIELDS_FRAGMENT} from "../components/UserDetails";


const GET_USER_QUERY = gql`
  query GetBook($userId: ID!) {
    user(id: $userId)  {
    __typename
    ...userDetailFields
  }
  }
${USER_DETAILS_FIELDS_FRAGMENT}
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


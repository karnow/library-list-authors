import React from "react";
import { gql } from "@apollo/client";
import User, { USER_DETAILS_FIELDS_FRAGMENT } from "./UserDetails";
import { Stack, Text } from "@chakra-ui/react";

export const CURRENT_USER_DETAILS_FIELDS_FRAGMENT = gql`
  fragment currentUserDetailsFields on User {
    ...userDetailFields
    isAdmin
    email
   }
  ${USER_DETAILS_FIELDS_FRAGMENT}
`;

export default function CurrentUserDetails({ currentUser }) {
  return (
    <Stack>
      <User user={currentUser} />
      <Text>{currentUser.email}</Text>
      <Text>
        {currentUser.isAdmin ? "You are an admin" : "You are not an admin"}
      </Text>
    </Stack>
  );
}
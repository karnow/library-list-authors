import React from "react";
import { gql } from "@apollo/client";

import { Heading, Stack, Text, Box } from "@chakra-ui/react";
import Avatar, { AVATAR_FIELDS_FRAGMENT }from "./Avatar";

export const CURRENT_USER_DETAILS_FIELDS_FRAGMENT = gql`
  fragment currentUserDetailsFields on CurrentUser {
    id
    name
    info
    email
    isAdmin
    avatar {
      ...avatarFields
    }
  }
  ${AVATAR_FIELDS_FRAGMENT}
`;


export default function CurrentUserDetails({ currentUser }) {
  return (
    <Stack mt="5">
      <Heading size="lg" color="gray.700">
        Your profile
      </Heading>
      <Stack isInline alignItems="center">
        <Avatar mr="3" size="xl" avatar={currentUser.avatar} />
        <Box as="article">
          <Heading size="sm" color="gray.700">
            {`${currentUser.name} <${currentUser.email}>`}
          </Heading>
          {currentUser.isAdmin && <Text as="strong">You are an admin!</Text>}
          <Text>{currentUser.info}</Text>
        </Box>
      </Stack>
    </Stack>
  );
}
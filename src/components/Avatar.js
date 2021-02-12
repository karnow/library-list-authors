import React from "react";
import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import { gql } from "@apollo/client";

export const AVATAR_FIELDS_FRAGMENT = gql`
  fragment avatarFields on Avatar {
    image {
      url
    }
    color
  }
`;

export default function Avatar({ avatar, ...remainingProps }) {
  return (
    <ChakraAvatar
      src={avatar.image.url}
      bg={`${avatar.color}.500`}
      {...remainingProps}
    />
  );
}



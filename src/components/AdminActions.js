import React from "react";
import { Stack } from "@chakra-ui/react";
import { useAuth } from "./AuthProvider";

export default function AdminActions({ children, ...remainingProps }) {
  const { currentUser } = useAuth();
  if (!children || !currentUser || !currentUser.isAdmin) {
    return null;
  }
  return (
    <Stack m="3" p="3" bg="red.200" direction="row" {...remainingProps}>
      {children}
    </Stack>
  );
}

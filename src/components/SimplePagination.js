import { Button, Flex } from "@chakra-ui/react";
import React from "react";

export default function SimplePagination({ pageNumber, onPageChange }) {
  return (
    <Flex justifyContent="space-between" my="5">
      <Button onClick={() => onPageChange(pageNumber - 1)}>
        Previous Page
      </Button>
      <Button disabled>{pageNumber}</Button>
      <Button onClick={() => onPageChange(pageNumber + 1)}>Next Page</Button>
    </Flex>
  );
}

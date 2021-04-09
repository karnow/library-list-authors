import { Button, Flex } from "@chakra-ui/react";
import React from "react";

export default function SimplePagination({ pageInfo, onPageChange }) {
  const { currentPageNumber, previousPageNumber, nextPageNumber } = pageInfo;
    
  return (
    <Flex justifyContent="space-between" my="5">
          <Button disabled={!previousPageNumber} onClick={() => onPageChange(previousPageNumber)}>
        Previous Page
      </Button>
      <Button disabled>{currentPageNumber}</Button>
      <Button disabled={!nextPageNumber} onClick={() => onPageChange(nextPageNumber)}>Next Page</Button>
    </Flex>
  );
}

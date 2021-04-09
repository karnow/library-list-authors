import { Button, Flex } from "@chakra-ui/react";
import React from "react";

export default function ComplexPagination({ pageInfo, onPageChange }) {
  const { currentPageNumber, previousPageNumber, nextPageNumber, firstNumberPage, lastPageNumber } = pageInfo;
    
  return (
    <Flex justifyContent="space-between" my="5">
          <Button disabled={firstNumberPage===currentPageNumber} onClick={() => onPageChange(firstNumberPage)}>
              First Page
      </Button>
      <Button disabled={!previousPageNumber} onClick={() => onPageChange(previousPageNumber)}>
        Previous Page
      </Button>    

          <Button disabled>{currentPageNumber}</Button>
          <Button disabled={!nextPageNumber} onClick={() => onPageChange(nextPageNumber)}>Next Page</Button>
      <Button disabled={lastPageNumber===currentPageNumber} onClick={() => onPageChange(lastPageNumber)}>Last Page</Button>
    </Flex>
  );
}

import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import PageButton from "./Pagination/PageButton";

export default function SimplePagination({ pageInfo, onPageChange }) {
  const { currentPageNumber, previousPageNumber, nextPageNumber } = pageInfo;
  const commonPageButtonProps = { currentPageNumber, onPageChange }
  return (
    <Flex justifyContent="space-between" my="5">
          <PageButton newPageNumber={previousPageNumber} {...commonPageButtonProps}>
        Previous Page
      </PageButton>
      <PageButton
        newPageNumber={currentPageNumber}
        {...commonPageButtonProps}
      />
      <PageButton newPageNumber={nextPageNumber} {...commonPageButtonProps}>
        Next Page
      </PageButton>
    </Flex>
  );
}

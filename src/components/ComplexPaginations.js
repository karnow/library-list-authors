import { Flex } from "@chakra-ui/react";
import React from "react";
import PageButton from "./Pagination/PageButton";

export default function ComplexPagination({ pageInfo, onPageChange }) {
  const { currentPageNumber, previousPageNumber, nextPageNumber, firstNumberPage, lastPageNumber } = pageInfo;
    const commonPageButtonProps = { currentPageNumber, onPageChange };
  return (
    <Flex justifyContent="space-between" my="5">
      <PageButton newPageNumber={firstNumberPage} {...commonPageButtonProps}>
        First Page
      </PageButton>
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
      <PageButton newPageNumber={lastPageNumber} {...commonPageButtonProps}>
        Last Page
      </PageButton>
    </Flex>
  );
}

import { Flex } from "@chakra-ui/react";
import React from "react";
import PageButton from "./Pagination/PageButton";
import ClosestPagesButtons from "../components/Pagination/ClosestPagesButtons";

export default function ComplexPagination({ pageInfo, onPageChange }) {
  const { currentPageNumber, firstNumberPage, lastPageNumber } = pageInfo;
    const commonPageButtonProps = { currentPageNumber, onPageChange };
  return (
    <Flex justifyContent="space-between" my="5">
      <PageButton newPageNumber={firstNumberPage} {...commonPageButtonProps}>
        First Page
      </PageButton>
      
      <ClosestPagesButtons pageInfo={pageInfo} onPageChange={onPageChange}/>

      <PageButton newPageNumber={lastPageNumber} {...commonPageButtonProps}>
        Last Page
      </PageButton>
    </Flex>
  );
}

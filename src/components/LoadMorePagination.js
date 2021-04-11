import React from "react";
import PageButton from "./Pagination/PageButton";

export default function LoadMorePagination({ pageInfo, onPageChange }) {
    const { nextPageNumber } = pageInfo;

      
    const buttonProperty={my:"5", width:"100%"}
    return <PageButton remainingProps={buttonProperty}
        newPageNumber={nextPageNumber}
        onPageChange={onPageChange}>Load More</PageButton>
}



import React from "react";
import PageButton from "./PageButton";

export default function ClosestPagesButtons({ pageInfo, onPageChange, closestPagesCount=4 }) {
  const { currentPageNumber, firstNumberPage, lastPageNumber } = pageInfo;
    const closestPagesStart = Math.max(firstNumberPage, Math.min(currentPageNumber - closestPagesCount/ 2, lastPageNumber - closestPagesCount));
    const closestPagesEnd = Math.min(closestPagesStart+closestPagesCount ,lastPageNumber);
    const closestPageNumbers = [
        ...Array(closestPagesEnd - closestPagesStart + 1).keys()
    ].map(i => i + closestPagesStart);

    
const commonPageButtonProps = { currentPageNumber, onPageChange };
  return (
    <>
          {closestPageNumbers.map(pageNumber =>
              <PageButton key={pageNumber} newPageNumber={pageNumber} {...commonPageButtonProps} />)}
      
   </>
  );
}

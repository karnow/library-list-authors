import { Button } from "@chakra-ui/react";
import React from "react";

export default function PageButton({
  newPageNumber,
  currentPageNumber,
  onPageChange,
  children,
  remainingProps
}) {
  return (
    <Button disabled={!newPageNumber || newPageNumber === currentPageNumber}
      onClick={() => onPageChange(newPageNumber)}
      {...remainingProps}
    >
      {children || newPageNumber}
    </Button>
  );
}
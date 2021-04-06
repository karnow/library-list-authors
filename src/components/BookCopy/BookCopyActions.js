import React from "react";
import { Stack } from "@chakra-ui/react";
import BorrowButton from "./BorrowButton";
import ReturnButton from "./ReturnButton";
import { useAuth } from "../AuthProvider";

export default function BookCopyActions({ bookCopy, ...remainingProps }) {
  const { currentUser } = useAuth();
  const canBeReturned = !!bookCopy.borrower && currentUser && currentUser.id === bookCopy.borrower.id;
  const canBeBorrowed = !bookCopy.borrower && currentUser ;
  // console.log("pożyczka", canBeBorrowed,  )
  // console.log("zwrot", canBeReturned, currentUser, bookCopy)
  // console.log("user", currentUser)

  return (
    <Stack {...remainingProps}>
      {canBeBorrowed && <BorrowButton availableBookCopy={bookCopy} />}
      {canBeReturned && <ReturnButton borrowedBookCopy={bookCopy} />}
    </Stack>
  );
}

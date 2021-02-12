import React from "react";
import BookDetails from "./BookDetails";
import { BOOK_DETAILS_FIELDS_FRAGMENT } from "../components/BookDetails";
import { gql } from "@apollo/client";
import AuthorDetails, {AUTHOR_DETAILS_FIRLEDS_FRAGMENT} from "./AuthorDetails";
import UserDetails, { USER_DETAILS_FIELDS_FRAGMENT } from "./UserDetails";
import BookCopy, {BOOK_COPY_FIELDS_FRAGMENT }from '../components/BookCopy';

export const ANYTHING_DETAILS_FIELDS_FRAGMENT =gql`
fragment anythingDetailsFields on Anything {
  ...BookDetailFields
  ...authorDetailFields
  ...userDetailFields
  ...bookCopyFields
}
${BOOK_DETAILS_FIELDS_FRAGMENT}
${AUTHOR_DETAILS_FIRLEDS_FRAGMENT}
${USER_DETAILS_FIELDS_FRAGMENT}
${BOOK_COPY_FIELDS_FRAGMENT}
`

export default function AnythingDetails({ anything }) {
  switch (anything.__typename) {
    case "Book": {
      return <BookDetails book={anything} />
    }
    case "BookCopy": {
      return <BookCopy bookCopy={anything} showOwner showBorrower showActions/>
    }
    case "Author": {
      return <AuthorDetails author={anything} />
    }
    case "User": {
      return <UserDetails user={anything}/>
    }
    default: {
      return <p>Unsupported __typename - [{anything.__typename}]</p>;
    }
  }
}
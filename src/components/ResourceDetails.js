import React from "react";
import BookDetails from "./BookDetails";
import { BOOK_DETAILS_FIELDS_FRAGMENT } from "./BookDetails";
import { gql } from "@apollo/client";
import AuthorDetails, {AUTHOR_DETAILS_FIRLEDS_FRAGMENT} from "./AuthorDetails";
import UserDetails, { USER_DETAILS_FIELDS_FRAGMENT } from "./UserDetails";
import BookCopy from './BookCopy';
import { BOOK_COPY_FIELDS_FRAGMENT } from './BookCopy/fragments';

export const RESOURCE_DETAILS_FIELDS_FRAGMENT =gql`
fragment resourceDetailsFields on Resource {
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

export default function ResourceDetails({ resource }) {
  switch (resource.__typename) {
    case "Book": {
      return <BookDetails book={resource} />
    }
    case "BookCopy": {
      return <BookCopy bookCopy={resource} showOwner showBorrower showActions/>
    }
    case "Author": {
      return <AuthorDetails author={resource} />
    }
    case "User": {
      return <UserDetails user={resource}/>
    }
    default: {
      return <p>Unsupported __typename - [{resource.__typename}]</p>;
    }
  }
}
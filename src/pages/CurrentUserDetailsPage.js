import React from "react";
import { useQuery, gql } from "@apollo/client";


import CurrentUserDetails, {
  CURRENT_USER_DETAILS_FIELDS_FRAGMENT
} from "../components/CurrentUserDetails";


export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    currentUser {
      ...currentUserDetailsFields
    }
  }
  ${CURRENT_USER_DETAILS_FIELDS_FRAGMENT}
`;


export default function CurrentUserDetailsPage() {
  const { loading, error, data } = useQuery(GET_CURRENT_USER_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
      console.log(error)
    return <p>Could not load currentUser...</p>;
    }
    const { currentUser } = data;
    if (!currentUser) {
        console.log(currentUser)
        return <p>You need to be logged in to see this page</p>;
    }
    
  return <CurrentUserDetails currentUser={currentUser} />;
    
}

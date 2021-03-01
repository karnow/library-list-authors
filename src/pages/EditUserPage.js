import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import { GET_USER_QUERY } from "./UserDetailsPage";

export default function EditUserPage() {
    const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load user "{userId}"</p>;
  }
  const { user } = data;
  if (!user) {
    return <p> User not found</p>
  }
  return <p>Edit user ({user.name})page</p>;
}
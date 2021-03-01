import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { useToast } from "../components/Toast";
import UserUpdateForm from "../components/UserUpdateForm";
import { GET_USER_QUERY } from "./UserDetailsPage";

export default function EditUserPage() {
    const toast = useToast();
    const navigate = useNavigate();
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
    return <UserUpdateForm
        user={user}
        onUpdate={() => {
        toast({ status: "warning", description: "NOT IMPLEMENTED" })
    }} isUpdating={false}
        onCancel={ ()=> navigate(`/user/${user.id}`)}/>;
}
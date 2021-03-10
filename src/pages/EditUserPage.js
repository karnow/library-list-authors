import { useQuery, gql, useMutation } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { useToast } from "../components/Toast";
import UserUpdateForm from "../components/UserUpdateForm";
import { GET_USER_QUERY } from "./UserDetailsPage";
import { USER_DETAILS_FIELDS_FRAGMENT } from "../components/UserDetails";

const UPDATE_USER_MUTATION = gql`
mutation UpdateUser($updateUserInput: UpdateUserInput!){
  updateUser(input: $updateUserInput){
    success
    message
    user {
      ...userDetailFields
    }
  }
}
${USER_DETAILS_FIELDS_FRAGMENT}
`;


export default function EditUserPage() {
    const toast = useToast();
    const navigate = useNavigate();
    const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId }
  });
  const [updateUser, { loading: isUpdating }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: ({ updateUser: { success, message } }) => {
      toast({
        description: message,
        status: success ? "success" : "error"
      });
      if (success) {
        navigate(`/user/${userId}`);
      }
      
    }
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
        onUpdate={(updateUserInput) => {updateUser({variables: {updateUserInput}})}} isUpdating={isUpdating}
        onCancel={ ()=> navigate(`/user/${user.id}`)}/>;
}
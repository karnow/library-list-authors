import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import UserCreateForm from "../components/UserCreateForm";
import { useToast } from "../components/Toast";
import { USER_DETAILS_FIELDS_FRAGMENT } from "../components/UserDetails";
import { ALL_USERS_QUERY } from "./UsersPage";
import { GET_USER_QUERY } from "./UserDetailsPage";
import { BOOK_COPY_FIELDS_FRAGMENT } from '../components/BookCopy/fragments';

const CREATE_USER_MUTATION = gql`
mutation CreateUser($createUserInput: CreateUserInput!){
  createUser(input: $createUserInput){
    success
    message
    user {
      ...userDetailFields
        ownedBookCopies {
    ...bookCopyFields
    }

    borrowedBookCopies {
    ...bookCopyFields 
    }
    }
  }
}
${USER_DETAILS_FIELDS_FRAGMENT}
${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function NewUserPage() {
    const toast = useToast();
    const navigate = useNavigate();
    const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: ({ createUser: { success, message, user } }) => {
      toast({
        description: message,
        status: success ? "success" : "error"
      });
      if (success) {
        navigate(`/user/${user.id}`);
      }
      
        },
        update: (cache, {data: {createUser: {user}}}) => {
            try {
                const cachedData = cache.readQuery(
                    {
                        query: ALL_USERS_QUERY,
                        variables: { searchQuery: "" }
                    }
                )
                cache.writeQuery({
                    query: ALL_USERS_QUERY,
                    variables: { searchQuery: "" },
                    data: {
                    users: [...cachedData.users, user]
                    }
                })
                console.info("Updated cached users data.")
            } catch (error) {
                console.info("Did not update cached user data:", error)
             }
            cache.writeQuery({
                query: GET_USER_QUERY,
                variables: { userId: user.id },
                data: {
                    user
                }
            })
        },
  });

    return <UserCreateForm onCreate={(createUserInput) => {
        createUser({ variables: { createUserInput } })
    }} isCreating={loading}
        onCancel={ ()=> navigate("/users")}/>;
}
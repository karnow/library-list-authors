import { Button } from "@chakra-ui/react";
import React from "react";
import { useToast } from "./Toast";
import { gql, useMutation } from "@apollo/client";
import { ALL_USERS_QUERY } from "../pages/UsersPage";
import { GET_USER_QUERY } from "../pages/UserDetailsPage";

const DELETE_USER_MUTATION = gql`
mutation DeleteUser($userId: ID!) {
    deleteUser(id: $userId){
        success
        message
        id
    }
    
}
`;

export default function UserDeleteButton({userId, ...remainingProps}) {
    const toast = useToast();
    const [deleteUser, { loading }] = useMutation(DELETE_USER_MUTATION, { variables: {userId},
        onCompleted: ({ deleteUser: { success, message } }) => {
            toast({
                description: message,
                status: success ? "success" : "error"
            });
            
        },
        update: cache => {
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
                        users: cachedData.users.filter(user => user.id !== userId)
                    }
                })
                console.info("Updated cached users data.")
            } catch (error) {
                console.info("Did not update cached user data:", error)
             }
            cache.writeQuery({
                query: GET_USER_QUERY,
                variables: { userId },
                data: {
                    user: null
                }
            })
        },
        
    });

    return <Button onClick={() => {
        deleteUser();
        
    }}
    isLoading={loading} {...remainingProps}>Delete user</Button>

}
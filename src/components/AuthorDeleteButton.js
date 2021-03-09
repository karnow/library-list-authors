import { Button } from "@chakra-ui/react";
import React from "react";
import { useToast } from "./Toast";
import { ALL_AUTHORS_QUERY } from "../pages/AuthorsPage";
import { GET_AUTHOR_QUERY } from "../pages/AuthorDetailsPage";
import { gql, useMutation } from "@apollo/client";


const DELETE_AUTHOR_MUTATION = gql`
mutation DeleteUser($authorId: ID!) {
    deleteAuthor(id: $authorId){
        success
        message
        id
    }
    
}
`;

export default function AuthorDeleteButton({authorId, ...remainingProps}) {
    const toast = useToast();
      const [deleteAuthor, { loading }] = useMutation(DELETE_AUTHOR_MUTATION, { variables: {authorId},
        onCompleted: ({ deleteAuthor: { success, message } }) => {
            toast({
                description: message,
                status: success ? "success" : "error"
            });
            
        },
        update: cache => {
            const cachedData = cache.readQuery(
                {
                    query: ALL_AUTHORS_QUERY,
                    variables: {searchQuery: "" }
                }
            )
            cache.writeQuery({
                    query: ALL_AUTHORS_QUERY,
                    variables: { searchQuery: "" },
                    data: {
                    authors: cachedData.authors.filter(author=> author.id !== authorId)
                    }
            })
            cache.writeQuery({
                query: GET_AUTHOR_QUERY,
                variables: { authorId },
                data: {
                author: null
                }
            })
        },
        
    });
    return <Button onClick={() => {
        deleteAuthor();
        
    }}
    isLoading={loading} {...remainingProps}>Delete Author</Button>

}
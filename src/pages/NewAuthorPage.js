import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import AuthorCreateForm from "../components/AuthorCreateForm";
import { useToast } from "../components/Toast";
import { AUTHOR_DETAILS_FIRLEDS_FRAGMENT } from "../components/AuthorDetails";
import { ALL_AUTHORS_QUERY } from "./AuthorsPage";
import { GET_AUTHOR_QUERY } from "./AuthorDetailsPage";
import {BOOK_FIELDS_FRAGMENT} from "../components/Book";

const CREATE_AUTHOR_MUTATION = gql`
mutation CreateAuthor($createAuthorInput: CreateAuthorInput!){
  createAuthor(input: $createAuthorInput){
    success
    message
    author {
        ...authorDetailFields
        books {
            ...bookFields
           }
      
        }
    }
  
}
${AUTHOR_DETAILS_FIRLEDS_FRAGMENT}
${BOOK_FIELDS_FRAGMENT}
`;

export default function NewAuthorPage() {
    const toast = useToast();
    const navigate = useNavigate();
    
    const [createAuthor, { loading}] = useMutation(CREATE_AUTHOR_MUTATION, {
        onCompleted: ({ createAuthor: { success, message, author } }) => {
           
      toast({
        description: message,
        status: success ? "success" : "error"
      });
      if (success) {
        navigate(`/author/${author.id}`);
        console.log("przekierowałem na authorDetailsPage")
        }
        
       
        },

      refetchQueries: ({ data: { createAuthor: { author } } }) => {
        console.log({ createAuthor: { author } })
        
         return [
          
            {
              query: ALL_AUTHORS_QUERY,
              variables: { searchQuery: "" }
            },
          
        
          {
            query: GET_AUTHOR_QUERY,
            variables: { authorId: author.id }
          }
        ]
      }
    
        // update: (cache, {data: {createAuthor: {author}}}) => {
        //     try {
        //         const cachedData = cache.readQuery(
        //             {
        //                 query: ALL_AUTHORS_QUERY ,
        //                 variables: { searchQuery: "" }
        //             }
        //         )
        //         cache.writeQuery({
        //             query: ALL_AUTHORS_QUERY,
        //             variables: { searchQuery: "" },
        //             data: {
        //             authors: [...cachedData.authors, author]
        //             }
        //         })
        //         console.info("Updated cached authors data.")
        //     } catch (error) {
        //         console.info("Did not update cached author data:", error)
        //      }
        //     cache.writeQuery({
        //         query: GET_AUTHOR_QUERY,
        //         variables: { authorId: author.id },
        //         data: {
        //             author
        //         }
        //     })
        // },
  });

    return <AuthorCreateForm onCreate={(createAuthorInput) => {
        createAuthor({ variables: { createAuthorInput } })
        
    }} isCreating={loading}
        onCancel={ ()=> navigate("/authors")}/>;
}
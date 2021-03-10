import { useQuery, gql, useMutation } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { useToast } from "../components/Toast";
import AuthorUpdateForm from "../components/AuthorUpdateForm";
import { GET_AUTHOR_QUERY } from "./AuthorDetailsPage";
import {AUTHOR_DETAILS_FIRLEDS_FRAGMENT} from "../components/AuthorDetails";


const UPDATE_AUTHOR_MUTATION = gql`
mutation UpdateAuthor($updateAuthorInput: UpdateAuthorInput!){
  updateAuthor(input: $updateAuthorInput){
    success
    message
    author {
      ...authorDetailFields
    }
  }
}
${AUTHOR_DETAILS_FIRLEDS_FRAGMENT}
`;

export default function EditAuthorPage() {
    const toast = useToast();
    const navigate = useNavigate();
    const {authorId } = useParams();
    const { loading, error, data } = useQuery(GET_AUTHOR_QUERY, {
        variables: { authorId }
    });

    const [updateAuthor, { loading: isUpdating }] = useMutation(UPDATE_AUTHOR_MUTATION, {
        onCompleted: ({ updateAuthor: { success, message } }) => {
            toast({
                description: message,
                status: success ? "success" : "error"
            });
            if (success) {
                navigate(`/author/${authorId}`);
            }
        }
    });
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Could not load Author "{authorId}"</p>;
    }
    const { author } = data;
    if (!author) {
        return <p>Could not load Author "{authorId}"</p>
    }
    
  
    return <AuthorUpdateForm
        author={author}
        onUpdate={(updateAuthorInput) => {updateAuthor({variables: {updateAuthorInput}})}} isUpdating={isUpdating}
        onCancel={() => navigate(`/author/${author.id}`)} />
}

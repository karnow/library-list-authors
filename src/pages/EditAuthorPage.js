import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { useToast } from "../components/Toast";
import AuthorUpdateForm from "../components/AuthorUpdateForm";
import { GET_AUTHOR_QUERY } from "./AuthorDetailsPage";

export default function EditAuthorPage() {
    const toast = useToast();
    const navigate = useNavigate();
    const {authorId } = useParams();
    const { loading, error, data } = useQuery(GET_AUTHOR_QUERY, {
        variables: { authorId }
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
        onUpdate={() => {
            toast({ status: "warning", description: "NOT IMPLEMENTED" })
        }} isUpdating={false}
        onCancel={() => navigate(`/author/${author.id}`)} />
}

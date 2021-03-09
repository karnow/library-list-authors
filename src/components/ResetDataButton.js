import { Button } from "@chakra-ui/react";
import React from "react";
import { useToast } from "./Toast";
import { gql, useMutation } from "@apollo/client";

const RESET_DATA_MUTATION = gql`
mutation ResetData {
    resetData {
        success
        message
    }
}
`;
export default function ResetDataButton(props) {
    const toast = useToast();
    const [resetData, { loading, client }] = useMutation(RESET_DATA_MUTATION, {
        onCompleted: ({ resetData: { success, message } }) => {
            toast({
                description: message,
                status: success ? "success" : "error"
            });
            if (success) {
                client.resetStore();
            }
        }
    });
    return <Button onClick={()=> {resetData()
        
    }}
    isLoading={loading} {...props}>Reset Data</Button>

}
import { Button } from "@chakra-ui/react";
import React from "react";
import { useToast } from "./Toast";


export default function UserDeleteButton(props) {
    const toast = useToast();
    return <Button onClick={()=> {
        toast({ status: "warning", description: "NOT IMPLEMENTED" })
    }}
    isLoading={false} {...props}>Delete user</Button>

}
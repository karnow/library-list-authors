
import React from "react";
import {gql, useMutation} from "@apollo/client";
import LogInForm from "../components/LogInForm";
import { useToast } from "../components/Toast";
import { useAuth } from "../components/AuthProvider";

const LOG_IN_MUTATION = gql`
mutation LogIn($credentials: LogInInput!){
  logIn(input: $credentials) {
    success
    message
    token
  }
}
`;

export default function LogInPage() {
  const { authorize } = useAuth();
  const toast = useToast();
  const [logIn, { loading }] = useMutation(LOG_IN_MUTATION, {
    onCompleted: ({ logIn: { success, message, token } }) => {
      toast({
        description: message,
        status: success ? "success" : "error"
      })
      if (success) {
        authorize(token);
      }
    }
  });


  return (
    <LogInForm
      onLogIn={credentials => logIn({variables:{credentials}})}
      isLoggingIn={loading}
    />
  );
}

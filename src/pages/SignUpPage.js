import React from "react";
import SignUpForm from "../components/SignUpForm";
import { gql, useMutation } from "@apollo/client";
import { useToast } from "../components/Toast";
import { useAuth } from "../components/AuthProvider";

const SIGN_UP_MUTATION = gql`
mutation SignUp($signUpData: SignInInput!){
  signUp(input: $signUpData) {
    success
    message
    token
    
  }
}
`;
export default function SignUpPage() {
   const { authorize } = useAuth();
  const toast = useToast();
  const [signUp, { loading }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: ({ signUp: { success, message, token } }) => {
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
    <SignUpForm
      onSignUp={signUpData => signUp({variables:{signUpData}})}
      isSigningUp={loading}
    />
  );
}

import React from "react";
import UserCreateForm from "../components/UserCreateForm";
import { useToast } from "../components/Toast";

export default function NewUserPage() {
    const toast = useToast();
  return <UserCreateForm/>;
}
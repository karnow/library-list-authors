import React, { useRef } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  ButtonGroup
} from "@chakra-ui/react";

export default function UserCreateForm({
  onCreate,
  onCancel,
  isCreating,
  ...remainingProps
}) {
  const nameRef = useRef();
  const emailRef = useRef();
  const infoRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onCreate({
      name: nameRef.current.value,
      email: emailRef.current.value,
      info: infoRef.current.value
    });
  }
  return (
    <Box as="form" mt="5" w="100%" onSubmit={handleSubmit}>
      <FormControl isDisabled={isCreating}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input ref={nameRef} id="name" placeholder="John" />
      </FormControl>
      <FormControl isDisabled={isCreating}>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          ref={emailRef}
          type="email"
          id="email"
          placeholder="john@example.com"
        />
      </FormControl>
      <FormControl isDisabled={isCreating}>
        <FormLabel htmlFor="info">Info</FormLabel>
        <Textarea
          ref={infoRef}
          id="info"
          placeholder="Here is a sample placeholder"
        />
      </FormControl>
      <ButtonGroup mt="3">
        <Button
          isLoading={isCreating}
          loadingText="Creating User..."
          type="submit"
          colorScheme="green"
        >
          Create User
        </Button>
        <Button onClick={onCancel}>Cancel creating</Button>
      </ButtonGroup>
    </Box>
  );
}

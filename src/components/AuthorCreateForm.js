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

export default function AuthorCreateForm({
  onCreate,
  onCancel,
  isCreating,
  ...remainingProps
}) {
  const nameRef = useRef();
  const bioRef = useRef();
    
  function handleSubmit(e) {
    e.preventDefault();
    onCreate({
      name: nameRef.current.value,
      info: bioRef.current.value
    });
  }
  return (
    <Box as="form" mt="5" w="100%" onSubmit={handleSubmit}>
      <FormControl isDisabled={isCreating}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input ref={nameRef} id="name" placeholder="John" />
      </FormControl>
      
      <FormControl isDisabled={isCreating}>
        <FormLabel htmlFor="info">Bio</FormLabel>
        <Textarea
          ref={bioRef}
          id="bio"
          placeholder="Here is a sample placeholder"
        />
          </FormControl>
          
      <ButtonGroup mt="3">
        <Button
          isLoading={isCreating}
          loadingText="Creating Author..."
          type="submit"
          colorScheme="green"
        >
          Create Author
        </Button>
        <Button onClick={onCancel}>Cancel creating</Button>
      </ButtonGroup>
    </Box>
  );
}

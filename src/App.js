import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import AuthorsPage from './pages/AuthorsPage';

function App() {
  return (
    <>
      <Flex direction="column" align="center" width="75%" mx="auto">
      <Heading as="h1">Personal Library</Heading>
      <AuthorsPage/>
      </Flex>
    </>
  );
}
export default App;

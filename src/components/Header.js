import React from "react";
import { Flex, Heading, Box, Divider, Center } from "@chakra-ui/react";
import Link from "./Link";
import GuestMenu from "./Header/GuestMenu";
import UserMenu from "./Header/UserMenu";
import { useAuth } from "./AuthProvider";

function Header(props) {
  const { currentUser, unauthorize } = useAuth();

  return (
    <Flex
      direction={["column", null, "row"]}
      align="center"
      justifyContent="space-between"
      w="100%"
      mx="5"
      mt="3"
    >
      <Link to="/">
        <Heading as="h1">Personal Library</Heading>
      </Link>

      <Box d="flex" align="center" justifyContent="space-between">
        <Link to='/' >
            <Box as="span" margin="10px">Books</Box>
              </Link>
          <Center height="20px">   
        <Divider orientation="vertical"/>
              </Center> 
        <Link to='/authors' >
            <Box as="span" margin="10px">Authors</Box>
              </Link>
              
              <Center height="20px">   
        <Divider orientation="vertical"/>
              </Center> 
              
        <Link to='/users' >
            <Box as="span" margin="10px">Users</Box>
              </Link>
              
        <Center height="20px">   
        <Divider orientation="vertical"/>
              </Center> 
        {!currentUser ? (
          <GuestMenu />
        ) : (
          <UserMenu
            currentUser={currentUser}
            onLogOut={unauthorize}
          />
        )}
      </Box>
    </Flex>
  );
}
export default Header;
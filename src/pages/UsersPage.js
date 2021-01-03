import React from 'react';
import {gql, useQuery} from "@apollo/client";
import User from '../components/User';
import { SimpleGrid } from '@chakra-ui/react';

const ALL_USERS_QUERY = gql`query GetAllUsers {
    users {
      name
      avatar {
        image {
          url
        }
        color
      }
    }
  }`


export default function UsersPage() {
 const { loading, error, data} = useQuery(ALL_USERS_QUERY);
 if (loading) {
     return <p>loading ...</p>
 }
 if (error) {
    return <p>Could not load Users...</p>
 }

 const {users} = data;

return <SimpleGrid columns="2"> 
  {users.map(user => <User user={user}/>)}
  </SimpleGrid>

}



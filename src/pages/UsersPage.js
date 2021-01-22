import React from 'react';
import {gql, useQuery} from "@apollo/client";
import User from '../components/User';
import { SimpleGrid } from '@chakra-ui/react';
import Link from '../components/Link';

const ALL_USERS_QUERY = gql`query GetAllUsers {
    users {
      id
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

return <SimpleGrid columns={["1","2","4"]}> 

  {users.map(user =>
    <Link key={user.id} to={`/user/${user.id}`}>
    <User user={user}/>
    </Link>
    )}
  </SimpleGrid>

}



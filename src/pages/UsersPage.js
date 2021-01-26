import React from 'react';
import {gql, useQuery} from "@apollo/client";
import User from '../components/User';
import { SimpleGrid } from '@chakra-ui/react';
import Link from '../components/Link';
import {USER_FIELDS_FRAGMENT} from '../components/User';

import SearchBox, {useSearchQuery} from '../components/SearchBox';

const ALL_USERS_QUERY = gql`
query GetAllUsers ($searchQuery: String!){
    users (searchQuery: $searchQuery) {
     __typename
     ...userFields
    }
  }
${USER_FIELDS_FRAGMENT}
`;


export default function UsersPage() {
  const baseSearchPath ="/users/search/";
  const [searchQuery, handleSearchQueryChange] = useSearchQuery(baseSearchPath);


 const { loading, error, data} = useQuery(ALL_USERS_QUERY, {
  variables: { searchQuery}
});

 if (loading) {
     return <p>loading ...</p>
 }
 if (error) {
    return <p>Could not load Users...</p>
 }

 const {users} = data;
 const hasUsers = users.length > 0;

return <>
<SearchBox searchQuery={searchQuery} onSearchQueryChange={handleSearchQueryChange} />
<SimpleGrid columns={["1","2","4"]}> 

  {hasUsers ? (
    users.map(user =>(
        <Link key={user.id} to={`/user/${user.id}`}>
            <User user={user}/>
        </Link>
    ))
    ):(
      <p>No users found</p>
    )}

</SimpleGrid>
  </>

}



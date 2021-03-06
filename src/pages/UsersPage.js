import React from 'react';
import {gql, useQuery} from "@apollo/client";
import User from '../components/User';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import Link from '../components/Link';
import { USER_FIELDS_FRAGMENT } from '../components/User';
import AdminActions from '../components/AdminActions';
import ButtonLink from "../components/ButtonLink";
import UserDeleteButton from "../components/UserDeleteButton";

import SearchBox, {useSearchQuery} from '../components/SearchBox';
import ResetDataButton from '../components/ResetDataButton';

export const ALL_USERS_QUERY = gql`
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
      users.map(user => (
      <Stack key={user.id}>
        <Link  to={`/user/${user.id}`}>
            <User user={user}/>
          </Link>
          <AdminActions direction="column">
            <ButtonLink to={`/users/${user.id}/edit`}>Edit user</ButtonLink>
            <UserDeleteButton userId={user.id}/>
          </AdminActions>
      </Stack>
    ))
    ):(
      <p>No users found</p>
    )}

  </SimpleGrid>
  <AdminActions>
    <ButtonLink to="/users/new">Create new user</ButtonLink>
    <ResetDataButton/>
  </AdminActions>
  </>

}



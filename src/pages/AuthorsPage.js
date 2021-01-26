import React from 'react';
import {gql, useQuery} from "@apollo/client";
import Author from '../components/Author';
import { Flex } from '@chakra-ui/react';
import Link from '../components/Link';

import SearchBox, {useSearchQuery} from '../components/SearchBox';

const ALL_AUTHORS_QUERY = gql`
query GetAllAuthors($searchQuery: String!) {
    authors(searchQuery: $searchQuery) {
      id
      name
      photo {
        url
      }
    }
  }`


export default function AuthorsPage() {
  const baseSearchPath ="/authors/search/";
  const [searchQuery, handleSearchQueryChange] = useSearchQuery(baseSearchPath);


 const { loading, error, data} = useQuery(ALL_AUTHORS_QUERY, {
  variables: { searchQuery}
});
 if (loading) {
     return <p>loading ...</p>
 }
 if (error) {
    return <p>Could not load authors...</p>
 }

 const {authors} = data;
 const hasAuthors = authors.length > 0;

return <>

<SearchBox searchQuery={searchQuery} onSearchQueryChange={handleSearchQueryChange} />
<Flex wrap="wrap" justifyContent="space-around"> 

 
  {hasAuthors ? (
     authors.map(author =>(
      <Link key={author.id} to={`/author/${author.id}`}>
          <Author author={author}/>
      </Link>
  ))
  ) : (
      <p>No authors found</p>
      )
}

</Flex>
      </>
}

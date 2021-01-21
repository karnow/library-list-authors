import React from 'react';
import {gql, useQuery} from "@apollo/client";
import Author from '../components/Author';
import { Flex } from '@chakra-ui/react';
import Link from '../components/Link';

const ALL_AUTHORS_QUERY = gql`query GetAllAuthors {
    authors {
      id
      name
      photo {
        url
      }
    }
  }`


export default function AuthorsPage() {
 const { loading, error, data} = useQuery(ALL_AUTHORS_QUERY);
 if (loading) {
     return <p>loading ...</p>
 }
 if (error) {
    return <p>Could not load authors...</p>
 }

 const {authors} = data;

return <Flex wrap="wrap" justifyContent="space-around"> 
  {authors.map(author =>
  <Link key={author.id} to={`/author/${author.id}`}>
  <Author author={author}/>
  </Link>
  )}
  </Flex>

}

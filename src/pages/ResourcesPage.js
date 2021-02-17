import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/react";
import NormalizedResource, { NORMALIZED_RESOURCE_FIELDS_FRAGMENT, normalizeResource } from "../components/NormalizedResource";
import Link from "../components/Link";


const GET_RESOURCES_QUERY = gql`
  query GetResources {
    resources {
      id
      ...normalizedResourceFields
    }
  }
  ${NORMALIZED_RESOURCE_FIELDS_FRAGMENT}
`;

export default function EverythingPage() {
  const { loading, error, data } = useQuery(GET_RESOURCES_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load everything</p>;
  }

  const { resources } = data;
  // console.log(resources)
  const normalizedResources = resources.map(normalizeResource) 
  // console.log(normalizedEverything)

  return (
    <Box w="100%" bg="red.100" p={5}>
      <Heading textAlign="center" color="red.500">
        Warning! Admin area!
      </Heading>
      {normalizedResources.map(normalizedResource => (
      <Link
          to={`/admin/resource/${normalizedResource.id}`}
          key={normalizedResource.id}
        >
          <NormalizedResource normalizedResource={normalizedResource} />
          </Link>
      ))}
    </Box>
  );
}

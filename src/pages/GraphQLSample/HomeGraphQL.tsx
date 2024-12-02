import { ApolloProvider, useQuery } from '@apollo/client'
import React from 'react'
import client from '../../components/api/graphQL/apollo-client'

import AddButton from './AddButton';
import CharacterLists from './CharacterLists';

const HomeGraphQL = () => {

    
  return (
    <ApolloProvider client={client}>
        <AddButton />
        <CharacterLists />
    </ApolloProvider>

  )
}

export default HomeGraphQL;
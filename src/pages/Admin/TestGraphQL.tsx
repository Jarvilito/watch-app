import { ApolloProvider, useQuery } from '@apollo/client';
import React from 'react';
import client from '../../components/api/graphQL/apollo-client';
import { GET_CHARACTERS } from '../../components/api/graphQL/queries';

const TestGraphQL = () => {
	const { loading, error, data }: any = useQuery(GET_CHARACTERS);

	return (
		<ApolloProvider client={client}>
			<ul>
				{data.posts.map((post: any) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</ApolloProvider>
	);
};

export default TestGraphQL;

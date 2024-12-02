import { gql } from "@apollo/client";

export const CREATE_CHARACTER = gql`
    mutation CreateCharacter($name: String!) {
        createCharacter(name: $name) {
            id,
            name
        }
    }
`
// UpdatePost - self declared 
// updatePost - the method created in BE
// { id, title } is the body of the request


export const UPDATE_POST = gql`
    mutation UpdatePost($id: ID!,$title: String! ) {
        updatePost(id: $id, title: $title) {
            id,
            title
        }
    }
`

export const DELETE_POST = gql`
    mutation DeletePost($id: ID) {
        deletePost(id: $id) 
    }
`
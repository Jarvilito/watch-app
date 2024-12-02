import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
query ($name: String, $status: String, $page: Int) {
  characters(page: $page, filter: {name: $name, status: $status}){
      info {
      count
      next
      pages
      prev
    }
    results {
      id
      name,
      image,
      status,
      location {
        name
      },
    }
  }
}
`;


export const GET_CHARACTERS_BY_NAME = gql`
query Query($page: Int, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    info {
      count
      next
      pages
      prev
    }
    results {
      name
      image
      location {
        name
      }
    }
  }
}
`

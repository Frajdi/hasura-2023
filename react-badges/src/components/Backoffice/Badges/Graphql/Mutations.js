import { gql } from "@apollo/client";

export const CREATE_BADGE_MUTATION = gql`
  mutation deleteBadge(
    $title: String!
    $description: String!
    $r_title: String!
    $r_description: String!
  ) {
    insert_badges_definitions(
      objects: {
        title: $title
        description: $description
        badges_definitions_requirements_definitions: {
          data: { title: $r_title, description: $r_description }
        }
      }
    ) {
      returning {
        title
        description
        badges_definitions_requirements_definitions {
          title
          description
        }
      }
    }
  }
`;
export const DELETE_BADGE = gql`
  mutation MyMutation($id: Int!) {
    delete_requirements_definitions(
      where: { badges_definition: { id: { _eq: $id } } }
    ) {
      affected_rows
      
    }
    delete_badges_definitions(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

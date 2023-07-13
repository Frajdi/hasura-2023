import { gql } from "@apollo/client";

export const LOAD_BADGES = gql`
  query MyQuery {
    badges_definitions {
      title
      description
      badges_definitions_requirements_definitions(
        order_by: {
          badges_definition: {
            badges_definitions_requirements_definitions_aggregate: {}
            title: asc
          }
        }
      ) {
        title
        description
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const ADD_MANAGER = gql`
  mutation AddManager($name: String!) {
    insert_users_one(object: { name: $name, roles: ["manager"] }) {
      id
      name
    }
  }
`;

export const GET_ENGINEERS = gql`
  query getEngineers {
    engineers {
      id
      name
    }
  }
`;

export const ADD_RELATION = gql`
  mutation addRelation($engineer: Int!, $manager: Int!) {
    insert_users_relations_one(
      object: { engineer: $engineer, manager: $manager }
    ) {
      manager
      engineer
      created_by
      created_at
    }
  }
`;

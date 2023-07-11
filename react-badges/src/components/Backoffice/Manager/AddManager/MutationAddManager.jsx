import { gql } from "@apollo/client";

export const ADD_MANAGER = gql`
  mutation AddManager($name: String!) {
    insert_users_one(object: { name: $name, roles: ["manager"] }) {
      id
      name
    }
  }
`;

import { gql } from "@apollo/client";

export const LOAD_MANAGERS = gql`
  query MyQuery {
    managers {
      id
      name
    }
  }
`;

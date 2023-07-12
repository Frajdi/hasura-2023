import { gql } from "@apollo/client";

export const DELETE_MANAGER = gql`
  mutation DeleteManager($id: Int!) {
    deleteRelationManager: delete_users_relations(
      where: { manager: { _eq: $id } }
    ) {
      affected_rows
    }
    deleteRelationEngineer: delete_users_relations(
      where: { engineer: { _eq: $id } }
    ) {
      affected_rows
    }
    delete_users(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

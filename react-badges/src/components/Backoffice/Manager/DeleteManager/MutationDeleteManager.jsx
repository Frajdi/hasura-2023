import { gql } from "@apollo/client";

export const DELETE_MANAGER = gql`
  mutation DeleteManager($id: Int!) {
    update_managers(where: { id: { _eq: $id } }, _set: { is_deleted: true }) {
      returning {
        is_deleted
        name
      }
    }
  }
`;

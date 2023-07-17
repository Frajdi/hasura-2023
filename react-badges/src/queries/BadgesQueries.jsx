import { gql } from "@apollo/client";

export const GET_BADGES = gql`
  query getBadges {
    badges_versions_last(where: { is_deleted: { _eq: false } }) {
      description
      requirements
      title
      id
    }
  }
`;

export const CREATE_BADGE = gql`
  mutation createBadge(
    $title: String!
    $description: String!
    $req_title: String!
    $req_description: String!
  ) {
    insert_badges_definitions(
      objects: {
        title: $title
        description: $description
        badges_definitions_requirements_definitions: {
          data: { description: $req_description, title: $req_title }
        }
      }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const CREATE_BADGE_VERSION = gql`
  mutation createBadgeVersion($id: Int!) {
    create_badge_version(args: { badge_def_id: $id, is_deleted: false }) {
      title
    }
  }
`;

export const DELETE_BADGE = gql`
  mutation deleteBadge($badge_def_id: Int!) {
    create_badge_version(
      args: { badge_def_id: $badge_def_id, is_deleted: true }
    ) {
      id
      is_deleted
    }
  }
`;

export const GET_SINGLE_INFO = gql`
  query getSingleInfo($id: Int!) {
    badges_versions_last(where: { id: { _eq: $id } }) {
      description
      requirements
      title
    }
  }
`;

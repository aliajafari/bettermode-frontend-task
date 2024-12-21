import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  fragment ImageThumbnail on Image {
    __typename
    url
    width
    height
  }
  query GetPosts(
    $after: String
    $before: String
    $excludePins: Boolean
    $filterBy: [PostListFilterByInput!]
    $limit: Int!
    $offset: Int
    $orderBy: PostListOrderByEnum
    $orderByString: String
    $postTypeIds: [String!]
    $reverse: Boolean
    $spaceIds: [ID!]
    $query: String
  ) {
    posts(
      after: $after
      before: $before
      excludePins: $excludePins
      filterBy: $filterBy
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      orderByString: $orderByString
      postTypeIds: $postTypeIds
      reverse: $reverse
      spaceIds: $spaceIds
      query: $query
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        slug
        title
        createdAt
        reactions {
          count
          reacted
        }
        reactionsCount
        fields {
          key
          value
        }
        thumbnail {
          ...ImageThumbnail
        }
      }
    }
  }
`;

export const GET_POST = gql`
  fragment ImageThumbnail on Image {
    __typename
    url
    width
    height
  }
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      slug
      title
      shortContent
      description
      createdAt
      reactions {
        count
        reacted
      }
      reactionsCount
      fields {
        key
        value
      }
      thumbnail {
        ...ImageThumbnail
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($input: AddReactionInput!, $postId: ID!) {
    addReaction(input: $input, postId: $postId) {
      status
    }
  }
`;

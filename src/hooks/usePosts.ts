import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { GET_POSTS } from "../queries/queries";
import { useState } from "react";

interface Post {
  id: string;
  slug: string;
  title: string;
  createdAt: string;
  reactions: Array<any>;
  reactionsCount: number;
  fields: Array<{ key: string; value: string }>;
  thumbnail: string | null;
}

interface PageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
}

interface UsePostsReturn {
  posts: Post[];
  totalCount: number;
  pageInfo: PageInfo | null;
  loading: boolean;
  error: ApolloError | null;
  fetchMore: () => void;
  isFetchingMore: boolean;
}

export const usePosts = (): UsePostsReturn => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const {
    data,
    loading,
    error,
    fetchMore: fetchMoreQuery,
  } = useQuery(GET_POSTS, {
    variables: {
      limit: 2,
    },
  });

  const posts = data?.posts.nodes || [];
  const pageInfo = data?.posts.pageInfo || null;
  const totalCount = data?.posts.totalCount || 0;

  const fetchMore = async () => {
    if (pageInfo?.hasNextPage) {
      setIsFetchingMore(true);
      try {
        await fetchMoreQuery({
          variables: {
            after: pageInfo.endCursor,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevResult;

            return {
              posts: {
                ...fetchMoreResult.posts,
                nodes: [
                  ...prevResult.posts.nodes,
                  ...fetchMoreResult.posts.nodes,
                ],
              },
            };
          },
        });
      } finally {
        setIsFetchingMore(false);
      }
    }
  };

  return {
    posts,
    totalCount,
    pageInfo,
    loading,
    error: error || null,
    fetchMore,
    isFetchingMore,
  };
};

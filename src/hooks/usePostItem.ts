import { useQuery } from "@apollo/client";
import { GET_POST } from "../queries/queries";

interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
  thumbnail: string | null;
  description: string;
  reactionsCount: number;
}

interface GetPostData {
  post: Post;
}

interface GetPostVariables {
  id: string;
}

export default function usePostItem({ id }: { id: string | undefined }) {
  const { data, loading, error } = useQuery<GetPostData, GetPostVariables>(
    GET_POST,
    {
      skip: !id,
      variables: id ? { id } : undefined,
    }
  );

  return {
    data: data,
    loading,
    error,
  };
}

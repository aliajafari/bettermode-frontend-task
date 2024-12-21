import React from "react";
import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/PostCard";
import Loading from "../components/Icons/Loading";

const PostList = () => {
  const { posts, pageInfo, loading, error, fetchMore, isFetchingMore } =
    usePosts();

  const isReadyToRender = Boolean(!loading && !error);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-black text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-3">
        Posts
      </h1>
      {error ? (
        <div
          className="bg-red-200 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div>
              <p className="text-sm">{error?.message}</p>
            </div>
          </div>
        </div>
      ) : null}
      {loading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : null}
      {isReadyToRender ? (
        <div className="flex flex-wrap">
          {posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                title={post.title}
                createdAt={post.createdAt}
                thumbnail={post.thumbnail}
                id={post.id}
              />
            );
          })}
        </div>
      ) : null}

      {pageInfo?.hasNextPage && (
        <div className="flex justify-center">
          <button
            onClick={fetchMore}
            disabled={isFetchingMore}
            className={`mt-4 px-4 py-2 ${
              isFetchingMore
                ? "bg-green-400 text-white"
                : "bg-green-500 text-white"
            } rounded`}
          >
            <div className="flex gap-1 justify-center">
              {isFetchingMore ? <Loading color="white" size={20} /> : null}
              Load More
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import usePostItem from "../hooks/usePostItem";
import { placeHolderPostImage } from "../constants";
import Loading from "../components/Icons/Loading";
import useAddReaction from "../hooks/useReaction";

export default function Post() {
  const { id } = useParams();
  const { addReaction, loading: loadingReaction } = useAddReaction();

  const [likes, setLikes] = useState(0);

  const { data, loading, error } = usePostItem({ id });

  useEffect(() => {
    if (data) {
      setLikes(data.post.reactionsCount);
    }
  }, [data]);

  useEffect(() => {}, [likes]);

  const handleReaction = async () => {
    if (id) {
      try {
        await addReaction({
          postId: id,
          reaction: "heart",
          overrideSingleChoiceReactions: true,
        });
        setLikes((prevState) => prevState + 1);
      } catch (err) {
        console.error("Failed to add reaction:", err);
      }
    }
  };

  const isReadyToRender = Boolean(!loading && !error);

  return (
    <div className="container mx-auto p-4">
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
        <>
          <img
            src={data?.post.thumbnail || placeHolderPostImage}
            className="w-full h-80 object-cover rounded mb-2"
          />
          <h1 className="text-3xl text-black font-bold">{data?.post.title}</h1>
          <p className="mt-4 text-black">{data?.post.description}</p>
          <div className="mt-4">
            <button
              onClick={handleReaction}
              className="px-4 py-2 bg-white-500 text-green-500 border border-green-600 rounded min-w-24 text-center"
            >
              <div className="flex justify-center">
                {loadingReaction ? (
                  <div>
                    <Loading color="#22c55e" size={24} />
                  </div>
                ) : (
                  `Like ${likes}`
                )}
              </div>
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

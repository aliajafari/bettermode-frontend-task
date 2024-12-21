import React from "react";
import { Link } from "react-router-dom";
import { placeHolderPostImage } from "../constants";

interface PostCardProps {
  title: string;
  createdAt: string;
  thumbnail?: string | null;
  id: string;
}

export default function PostCard({
  title,
  createdAt,
  thumbnail,
  id,
}: PostCardProps) {
  return (
    <div className="md:basis-1/4 basis-1/4 min-[320px]:basis-full p-1 flex-col">
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-4 h-full	">
        <img
          src={thumbnail || placeHolderPostImage}
          alt={title}
          className="w-full object-cover rounded mb-2 aspect-video"
        />

        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            <Link className="hover:text-green-600" to={`/post/${id}`}>
              {title}
            </Link>
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

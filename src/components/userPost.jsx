import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserPost = ({ post }) => {
  const [comment, setComment] = useState("");
  const [postLikes, setPostLikes] = useState(0); // menyimpan dan merubah like
  const [liked, setLiked] = useState(false); // menyimpan dan merubah like

  const handleComment = async (postId) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/create-comment`,
        { postId, comment: comment },
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setComment("");
      alert("Comment created");
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/like`,
        { postId },
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setPostLikes((prevLikes) => prevLikes + 1);
      setLiked(true);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlikePost = async (postId) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/unlike`,
        { postId },
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setPostLikes((prevLikes) => prevLikes - 1);
      setLiked(false);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  useEffect(() => {
    setLiked(post.isLike);
    setPostLikes(post.totalLikes);
  }, [post]);

  return (
    <div className="mt-4">
      {post.user && (
        <div className="flex">
          <div>{post.user.profilePictureUrl && <img src={post.user.profilePictureUrl} alt="gambar" className="w-8 h-8 rounded-full mr-2" />}</div>
          <div>
            <Link href={`/profile/${post.user.id}`}>{post.user.username}</Link>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center mb-2">
        <img src={post.imageUrl} alt="gambar" className="w-full max-h-90" />
      </div>

      {post.user && (
        <div className="pl-3">
          {liked ? (
            <button onClick={() => handleUnlikePost(post.id)} className="bg-red-500 text-white px-2 py-1 rounded">
              Unlike
            </button>
          ) : (
            <button onClick={() => handleLikePost(post.id)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
              Like
            </button>
          )}

          <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
          {comment && <button onClick={() => handleComment(post.id)}>Post</button>}
        </div>
      )}

      <p className="pl-3">{postLikes} likes</p>
      {post.user && (
        <div className="flex flex-col pl-3">
          <div className="flex flex-row">
            <p className="mr-4 ">{post.user.username}</p>
            <p className="mb-6">{post.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPost;

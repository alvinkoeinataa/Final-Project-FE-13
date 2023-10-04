import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

import UserPost from "./userPost";
import Cookies from "js-cookie";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [postLikes, setPostLikes] = useState({}); // menyimpan dan merubah like

  // const [token, setToken] = useState("");
  // const [userId, setUserId] = useState(null);

  const fetchData = async (currentPage) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/explore-post?size=10&page=${currentPage}`, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      const data = response.data;
      const postsData = data.data.posts;

      setTotalPages(data.data.totalPages);
      setPosts((prevPosts) => [...prevPosts, ...postsData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  // const handleLikePost = async (postId) => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/like`,
  //       { postId },
  //       {
  //         headers: {
  //           apiKey: process.env.NEXT_PUBLIC_API_KEY,
  //           Authorization: `Bearer ${Cookies.get("token")}`,
  //         },
  //       }
  //     );

  //     setPostLikes((prevLikes) => ({
  //       ...prevLikes,
  //       [postId]: prevLikes[postId] + 1,
  //     }));
  //   } catch (error) {
  //     console.error("Error liking post:", error);
  //   }
  // };

  // const handleUnlikePost = async (postId) => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/unlike`,
  //       { postId },
  //       {
  //         headers: {
  //           apiKey: process.env.NEXT_PUBLIC_API_KEY,
  //           Authorization: `Bearer ${Cookies.get("token")}`,
  //         },
  //       }
  //     );

  //     setPostLikes((prevLikes) => ({
  //       ...prevLikes,
  //       [postId]: prevLikes[postId] - 1,
  //     }));
  //   } catch (error) {
  //     console.error("Error unliking post:", error);
  //   }
  // };

  // const handleComment = async (postId) => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/create-comment`,
  //       { postId },
  //       {
  //         headers: {
  //           apiKey: process.env.NEXT_PUBLIC_API_KEY,
  //           Authorization: `Bearer ${Cookies.get("token")}`,
  //         },
  //         data: data,
  //       }
  //     );
  //     console.log("lala", response);

  //     setComment("");
  //   } catch (error) {
  //     console.error("Error liking post:", error);
  //   }
  // };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // useEffect(() => {
  //   const initialLikes = {};
  //   posts.forEach((post) => {
  //     initialLikes[post.id] = post.totalLikes;
  //   });
  //   setPostLikes(initialLikes);
  // }, [posts]);

  return (
    <div className="mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex flex-col items-center">
        <div className="w-full md:w-1/2 items-center bg-white ">
          {/* Daftar Posting */}
          <ul className="grid grid-cols-1">
            {posts.map((post, index) => (
              <li key={`${post.id}-${index}`} className="flex flex-col items-center border border-black">
                <UserPost post={post} />
              </li>
            ))}
          </ul>

          <button onClick={handleLoadMore} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full">
            Load More...
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;

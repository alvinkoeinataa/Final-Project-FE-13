import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Navhome from "@/components/navhome";
import Cookies from "js-cookie";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [postLikes, setPostLikes] = useState({}); // menyimpan dan merubah like

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/explore-post?size=10&page=${currentPage}`, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      const data = response.data;
      const postsData = data.data.posts;
      // console.log("API Response Data:", data);
      // console.log(data.data.posts);
      setTotalPages(data.data.totalPages);
      setPosts((prevPosts) => [...prevPosts, ...postsData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/like`,
        { postId }, // Kirim data postId ke server
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setPostLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: prevLikes[postId] + 1,
      }));

      console.log("Post Liked:", response.data);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlikePost = async (postId) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/unlike`,
        { postId }, // Kirim data postId ke server
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      // mengupdate state
      setPostLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: prevLikes[postId] - 1,
      }));

      console.log("Post Unliked:", response.data);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  useEffect(() => {
    if (!userId || !token) {
      const a = Cookies.get("userId");
      const b = Cookies.get("token");

      setUserId(a);
      setToken(b);
      fetchData();
    }
  }, []);

  useEffect(() => {
    // Memperbarui jumlah likes awal pada setiap postingan
    const initialLikes = {};
    posts.forEach((post) => {
      initialLikes[post.id] = post.totalLikes;
    });
    setPostLikes(initialLikes);
  }, [posts]);

  return (
    <div className="mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex flex-col items-center">
        <div className="w-full md:w-1/2 items-center bg-white ">
          {/* Daftar Posting */}
          <ul className="grid grid-cols-1">
            {posts.map((post, index) => (
              <li key={`${post.id}-${index}`} className="flex flex-col items-center border border-black">
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
                      <button onClick={() => handleLikePost(post.id)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                        Like
                      </button>
                      <button onClick={() => handleUnlikePost(post.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                        Unlike
                      </button>
                    </div>
                  )}

                  <p className="pl-3">{postLikes[post.id] || post.totalLikes} likes</p>
                  {post.user && (
                    <div className="flex flex-col pl-3">
                      <div className="flex flex-row">
                        <p className="mr-4 ">{post.user.username}</p>
                        <p className="mb-6">{post.caption}</p>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {currentPage < totalPages && (
            <button onClick={handleLoadMore} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full">
              Load More...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;

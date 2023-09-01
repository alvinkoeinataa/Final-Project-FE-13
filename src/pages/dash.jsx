import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Navhome from "@/components/navhome";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/explore-post?size=10&page=${currentPage}`, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  useEffect(() => {
    if (!userId || !token) {
      const a = localStorage.getItem("userId");
      const b = localStorage.getItem("token");

      setUserId(a);
      setToken(b);
      fetchData();
    }
  }, []);

  return (
    <div className="mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-4">
      <div className="flex flex-col items-center">
        <div className="w-full md:w-1/2 bg-white  p-4">
          {/* Navbar */}
          <Navhome />
        </div>

        <div className="w-full md:w-1/2 items-center bg-white ">
          {/* Daftar Posting */}
          <ul className="grid grid-cols-1">
            {posts.map((post, index) => (
              <li key={`${post.id}-${index}`} className="flex flex-col items-center border border-black">
                <div className="mt-10">
                  {post.user && (
                    <div className="flex">
                      <div>{post.user.profilePictureUrl && <img src={post.user.profilePictureUrl} alt="gambar" className="w-8 h-8 rounded-full mr-2" />}</div>
                      <div>
                        <Link href={`/profile/${post.user.id}`}>{post.user.username}</Link>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center mb-2">
                    <img src={post.imageUrl} alt="gambar" className="w-full max-h-60" />
                  </div>

                  <p>{post.totalLikes} likes</p>
                  {post.user && (
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <p className="mr-4">{post.user.username}</p>
                        <p className="mb-2">{post.caption}</p>
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

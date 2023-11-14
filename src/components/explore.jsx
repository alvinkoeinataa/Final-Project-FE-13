import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

import UserPost from "./userPost";
import Cookies from "js-cookie";
import YourFollow from "./yourFollow";
import Navhome from "./navhome";
import Bottomnav from "./bottomnav";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const blockedUserIds = ["a54c59e7-a1b6-4ac4-ae7b-9885a98ed869", "5b7a6783-2071-4e9f-9b8e-8e7fc4a981d4"];

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

  const filterBlockedUsers = (posts) => {
    const filteredPosts = posts.filter((post) => !blockedUserIds.includes(post.userId));
    return filteredPosts;
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 mb-10">
        <div className="md:col-span-1 hidden md:block">
          <div className="fixed">
            <Navhome />
          </div>
        </div>

        <div className="w-full md:col-span-2 items-center bg-white">
          <ul className="grid grid-cols-1">
            {filterBlockedUsers(posts).map((post, index) => (
              <li key={`${post.id}-${index}`} className="flex flex-col border border-black">
                <UserPost post={post} />
              </li>
            ))}
          </ul>
          <button onClick={handleLoadMore} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full">
            Load More...
          </button>
        </div>

        <Bottomnav />
        <YourFollow />
      </div>
    </div>
  );
};

export default Explore;

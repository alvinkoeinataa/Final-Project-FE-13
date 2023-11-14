import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import UserPost from "./userPost";
import YourFollow from "./yourFollow";
import Navhome from "./navhome";
import Bottomnav from "./bottomnav";

export const GetMyFollow = () => {
  const [users, setUsers] = useState([]);
  const [postLikes, setPostLikes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loadMore, setLoadMore] = useState(true);

  const blockedUserIds = ["a54c59e7-a1b6-4ac4-ae7b-9885a98ed869", "5b7a6783-2071-4e9f-9b8e-8e7fc4a981d4"];

  const fetchDataFollow = (currentPage) => {
    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/following-post?size=10&page=${currentPage}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
      },
    })
      .then((response) => {
        const data = response.data;
        const postsData = data.data.posts;

        setTotalPages(data.data.totalPages);
        setUsers((prevPosts) => [...prevPosts, ...postsData]);
      })
      .catch((error) => {
        console.log(error);
        alert("Error, reload the page!");
      });
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setLoadMore(false);
    }
  };

  const filterBlockedUsers = (posts) => {
    const filteredPosts = posts.filter((post) => !blockedUserIds.includes(post.userId));
    return filteredPosts;
  };

  useEffect(() => {
    fetchDataFollow(currentPage);
  }, [currentPage]);

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-1 hidden md:block">
          <Navhome />
        </div>

        <div className="w-full md:col-span-2 items-center bg-white">
          <ul className="grid grid-cols-1">
            {filterBlockedUsers(users).map((user, index) => (
              <li key={`${user.id}-${index}`} className="flex flex-col border border-black">
                <UserPost post={user} />
              </li>
            ))}
          </ul>
          <button onClick={handleLoadMore} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full">
            Load More...
          </button>
        </div>

        <Bottomnav />
        <YourFollow />
      </div>
    </div>
  );
};

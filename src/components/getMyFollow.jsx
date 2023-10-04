import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import UserPost from "./userPost";

export const GetMyFollow = () => {
  const [users, setUsers] = useState([]);
  const [postLikes, setPostLikes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loadMore, setLoadMore] = useState(true);
  // const [token, setToken] = useState("");
  // const [userId, setUserId] = useState(null);

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

  const handleLikePost = async (userId) => {
    console.log("Mengirim permintaan like dengan userId:", userId);
    // Mengubah nama parameter dan fungsi
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/like`,
        { userId },
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setPostLikes((prevLikes) => ({
        ...prevLikes,
        [userId]: prevLikes[userId] + 1,
      }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlikePost = async (userId) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/unlike`,
        { userId },
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      // Mengupdate state
      setPostLikes((prevLikes) => ({
        ...prevLikes,
        [userId]: prevLikes[userId] - 1,
      }));

      console.log("Post Unliked:", response.data);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setLoadMore(false);
    }
  };

  useEffect(() => {
    fetchDataFollow(currentPage);
  }, [currentPage]);

  // useEffect(() => {
  //   const initialLikes = {};
  //   users.forEach((user) => {
  //     initialLikes[user.id] = user.totalLikes;
  //   });
  //   setPostLikes(initialLikes);
  // }, [users]);

  return (
    <div className="mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex flex-col items-center">
        <div className="w-full md:w-1/2 items-center bg-white">
          {/* Daftar Pengguna */}
          <ul className="grid grid-cols-1">
            {users.map((user, index) => (
              <li key={`${user.id}-${index}`} className="flex flex-col items-center border border-black">
                <UserPost post={user} />
              </li>
            ))}
          </ul>

          {loadMore ? (
            <button onClick={handleLoadMore} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full">
              Load More...
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

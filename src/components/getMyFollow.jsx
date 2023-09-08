import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";

export const GetMyFollow = () => {
  const [users, setUsers] = useState([]);
  const [postLikes, setPostLikes] = useState({}); // menyimpan dan merubah like

  const fetchDataFollow = () => {
    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/following-post?size=10&page=1`,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
      },
    })
      .then((response) => {
        // console.log(response.data.data);
        setUsers(response.data.data.posts);
        const a = response.data.data.posts;
        console.log(a);
      })
      .catch((error) => {
        console.log(error);
        alert("Error, reload the page!");
      });
  };

  const handleLikePost = async (userId) => {
    // Mengubah nama parameter dan fungsi
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/like`,
        { userId }, // Menggunakan userId sebagai parameter
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setPostLikes((prevLikes) => ({
        ...prevLikes,
        [userId]: prevLikes[userId] + 1, // Menggunakan userId sebagai kunci
      }));

      console.log("Post Liked:", response.data);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlikePost = async (userId) => {
    // Mengubah nama parameter dan fungsi
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/unlike`,
        { userId }, // Menggunakan userId sebagai parameter
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
        [userId]: prevLikes[userId] - 1, // Menggunakan userId sebagai kunci
      }));

      console.log("Post Unliked:", response.data);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  useEffect(() => {
    fetchDataFollow();
  }, []);

  useEffect(() => {
    // Memperbarui jumlah likes awal pada setiap postingan
    const initialLikes = {};
    users.forEach((user) => {
      // Menggunakan users sebagai variabel
      initialLikes[user.id] = user.totalLikes; // Menggunakan user.id sebagai kunci
    });
    setPostLikes(initialLikes);
  }, [users]); // Menggunakan users sebagai dependensi

  return (
    <div className="mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex flex-col items-center">
        <div className="w-full md:w-1/2 items-center bg-white">
          {/* Daftar Pengguna */}
          <ul className="grid grid-cols-1">
            {users.map((user) => (
              <li key={user.id} className="flex flex-col items-center border border-black mt-4">
                <div className="mt-4">
                  {user.user && (
                    <div className="flex items-center">
                      <div>{user.user.profilePictureUrl && <img src={user.user.profilePictureUrl} alt="gambar" className="w-8 h-8 rounded-full mr-2" />}</div>
                      <div>
                        <Link href={`/profile/${user.user.id}`}>{user.user.username}</Link>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center mb-2">
                    <img src={user.imageUrl} alt="gambar" className="w-full max-h-90" />
                  </div>

                  {user.user && (
                    <div className="pl-3">
                      <button onClick={() => handleLikePost(user.id)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                        Like
                      </button>
                      <button onClick={() => handleUnlikePost(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                        Unlike
                      </button>
                    </div>
                  )}

                  <p className="pl-3">{postLikes[user.id] || user.totalLikes} likes</p>
                  {user.user && (
                    <div className="flex flex-col pl-3">
                      <div className="flex flex-row">
                        <p className="mr-4 ">{user.user.username}</p>
                        <p className="mb-6">{user.caption}</p>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";

function YourFollow() {
  const [users, setUsers] = useState([]);
  const [postLikes, setPostLikes] = useState({});

  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const fetchDataFollow = () => {
    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/following/${userId}?size=10&page=1`,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
      },
    })
      .then((response) => {
        console.log(response.data.data.users);
        setUsers(response.data.data.users);
      })
      .catch((error) => {
        console.log(error);
        alert("Error, reload the page!");
      });
  };

  // untuk mendapatkan userID
  useEffect(() => {
    if (!userId || !token) {
      const a = Cookies.get("userId");
      const b = Cookies.get("token");
      setUserId(a);
      setToken(b);
    }

    if (userId && token) {
      fetchDataFollow();
    }
  }, [userId, token]);

  return (
    <div>
      <h1>
        {users.map((item, index) => (
          <div key={index} className="flex items-center">
            <img src={item.profilePictureUrl} alt="" className="w-10 h-10" />
            <Link href={`/profile/${item.id}`}>{item.username}</Link>
          </div>
        ))}
      </h1>
    </div>
  );
}

export default YourFollow;

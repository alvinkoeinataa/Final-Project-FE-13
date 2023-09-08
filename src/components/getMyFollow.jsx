import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const GetMyFollow = () => {
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    fetchDataFollow();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          {/* <div>{user.userId}</div> */}

          <div>{user.user.email}</div>
          <div className="mb-6">{user.user.username}</div>
        </div>
      ))}
    </div>
  );
};

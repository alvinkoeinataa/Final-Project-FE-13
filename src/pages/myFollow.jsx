import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";

const MyFollow = () => {
  const [users, setUsers] = useState([]);

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);

  const fetchData = () => {
    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/my-followers?size=10&page=1`,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
      },
    })
      .then((response) => {
        console.log(response);
        setUsers(response.data.data.posts);
      })
      .catch((error) => {
        console.log(error);
        alert("Error, reload the page!");
      });
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

  return <div></div>;
};

export default MyFollow;

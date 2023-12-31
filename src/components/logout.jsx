import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function Logout() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState("");

  const handleLogout = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/logout`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      .then((res) => {
        // console.log(res);
        Cookies.remove("token");
        Cookies.remove("userId");
        Cookies.remove("name");

        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   if (!userId || !token) {
  //     const a = Cookies.get("userId");
  //     const b = Cookies.get("token");

  //     setUserId(a);
  //     setToken(b);
  //   }
  // }, []);

  return (
    <>
      <button onClick={handleLogout} className="bg-green-600 text-white px-6 py-2 rounded w-32">
        Log Out
      </button>
    </>
  );
}

export default Logout;

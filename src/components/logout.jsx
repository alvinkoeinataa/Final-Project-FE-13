import axios from "axios";
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      .then((res) => {
        // console.log(res);
        localStorage.clear();

        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!userId || !token) {
      const a = localStorage.getItem("userId");
      const b = localStorage.getItem("token");

      setUserId(a);
      setToken(b);
    }
  }, []);

  return (
    <>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded w-32">
        Log Out
      </button>
    </>
  );
}

export default Logout;

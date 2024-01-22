import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import Button from "../Elements/Button/Index";

function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/logout`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      .then((res) => {
        Cookies.remove("token");
        Cookies.remove("userId");
        Cookies.remove("name");

        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button classname="bg-green-600 w-32" onClick={handleLogout} type="">
        Log Out
      </Button>
    </>
  );
}

export default Logout;

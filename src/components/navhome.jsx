import Link from "next/link";
import Logout from "./logout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Navhome = () => {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  const handleProfileClick = () => {
    const userId = Cookies.get("userId");
    router.push(`/profile/${userId}`);
  };

  const handleUpdateProfile = () => {
    router.push(`/update-profile`);
  };

  useEffect(() => {
    if (!userId || !token) {
      const a = Cookies.get("userId");
      const b = Cookies.get("token");
      const c = Cookies.get("name");
      setUserId(a);
      setToken(b);
      setName(c);
    }
  }, [userId, token]);

  return (
    <div className="flex flex-wrap items-center justify-center space-x-0 md:space-x-4 md:flex-nowrap">
      <div className="px-2 py-2 rounded text-bold text-xl">PHOTOGRAM</div>
      <button className="bg-indigo-500 text-white px-4 py-2 rounded  md:w-auto w-full" onClick={handleProfileClick}>
        Profile
      </button>
      <button className="bg-indigo-500 text-white px-4 py-2 rounded md:w-auto w-full" onClick={handleUpdateProfile}>
        Update profile
      </button>
      <Link href={"/create-post"} className="bg-indigo-500 text-white px-4 py-2 rounded text-center md:w-auto w-full">
        Create post
      </Link>
      <Logout />
    </div>
  );
};

export default Navhome;

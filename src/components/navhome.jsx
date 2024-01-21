import Link from "next/link";
import Logout from "./logout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { UserIcon } from "@heroicons/react/solid";
import { CogIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/solid";
import { HomeIcon } from "@heroicons/react/solid";

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
    <div className="flex flex-col left-20 pl-10">
      <div className="px-2 py-2 rounded text-bold text-xl">
        <Link href={"/"}> PHOTOGRAM</Link>
      </div>

      <Link href={"/"} className="text-black px-1 py-3 pb-2 rounded text-center md:w-auto w-full flex flex-row">
        <HomeIcon className="w-6 h-6" />
        Home
      </Link>

      <button className="text-black px-1 py-3 rounded  md:w-auto w-full flex flex-row" onClick={handleProfileClick}>
        <UserIcon className="w-6 h-6" />
        Profile
      </button>
      <button className="text-black px-1 py-3 rounded md:w-auto w-full flex flex-row" onClick={handleUpdateProfile}>
        <CogIcon className="w-6 h-6" />
        Update profile
      </button>
      <Link href={"/create-post"} className="text-black px-1 py-3 pb-2 rounded text-center md:w-auto w-full flex flex-row">
        <PlusIcon className="w-6 h-6" />
        Create post
      </Link>
      <Logout />
    </div>
  );
};

export default Navhome;

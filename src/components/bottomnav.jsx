import Navhome from "./navhome";
import { HomeIcon } from "@heroicons/react/solid";

import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useState } from "react";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Bottomnav = () => {
  const [sideNav, setSideNav] = useState(false);
  return (
    <div>
      <div className="flex justify-between lg:hidden md:hidden sm-w-[400px]:block bottom-0 fixed w-full h-10 bg-lime-100">
        <Link href={"/"}>
          <HomeIcon className="w-8 h-8 ml-4" />
        </Link>

        <Link href={"/create-post"}>
          <PlusIcon className="w-8 h-8" />
        </Link>

        {sideNav ? <div className="bg-black/60 fixed w-full h-screen  z-10 top-0 left-0" onClick={() => setSideNav(!sideNav)}></div> : " "}
        <div className="cursor-pointer" onClick={() => setSideNav(!sideNav)}>
          <AiOutlineMenu size={32} className="mr-8 mt-1" />
        </div>

        <div className={sideNav ? "fixed top-0 left-0 w-[300px] h-screen bg-lime-100 z-10 duration-300" : "fixed top-0 left-[-100%] w-[300px] h-screen z-10 duration-300"}>
          <AiOutlineClose onClick={() => setSideNav(!sideNav)} size={25} className="absolute right-4 top-4 cursor-pointer" />

          <Navhome />
        </div>
      </div>
    </div>
  );
};

export default Bottomnav;

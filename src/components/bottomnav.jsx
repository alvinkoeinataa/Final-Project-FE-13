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
      <div className="flex justify-between lg:hidden md:hidden sm-w-[400px]:block bottom-0 fixed w-full h-12 bg-lime-200">
        <Link href={"/"}>
          <HomeIcon className="w-10 h-10 ml-4" />
        </Link>

        <Link href={"/create-post"}>
          <PlusIcon className="w-10 h-10" />
        </Link>

        {/* <Link href={"/create-post"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </Link> */}

        {sideNav ? <div className="bg-black/60 fixed w-full h-screen  z-10 top-0 left-0"></div> : " "}
        <div className="cursor-pointer" onClick={() => setSideNav(!sideNav)}>
          <AiOutlineMenu size={35} className="mr-8 mt-1" />
        </div>

        <div className={sideNav ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300" : "fixed top-0 left-[-100%] w-[300px] h-screen z-10 duration-300"}>
          <AiOutlineClose onClick={() => setSideNav(!sideNav)} size={25} className="absolute right-4 top-4 cursor-pointer" />

          <Navhome />
        </div>
      </div>
    </div>
  );
};

export default Bottomnav;

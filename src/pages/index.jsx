import Head from "next/head";
import Login from "./login";
import Register from "./register";

import { useState } from "react";
import { GetMyFollow } from "@/components/getMyFollow";
import Explore from "@/components/explore";

export default function Home() {
  const [visiblePage, setVisiblePage] = useState("explore");

  return (
    <div>
      <Head>
        <title>Photogram</title>
        <link rel="icon" href="/fav.icon.ico"></link>
      </Head>

      <button
        onClick={() => {
          setVisiblePage("explore");
        }}
      >
        Explore
      </button>
      <button
        onClick={() => {
          setVisiblePage("following");
        }}
      >
        Following
      </button>

      {visiblePage === "explore" ? (
        <div>
          <Explore />
        </div>
      ) : (
        <div>
          <GetMyFollow />
        </div>
      )}
    </div>
  );
}

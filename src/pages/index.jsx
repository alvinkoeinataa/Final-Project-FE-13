import Head from "next/head";

import { useState } from "react";
import { GetMyFollow } from "@/components/getMyFollow";
import Explore from "@/components/explore";
import Navhome from "@/components/navhome";

export default function Home() {
  const [visiblePage, setVisiblePage] = useState("explore");

  return (
    <div>
      {/* <Navhome /> */}

      <div>
        <Head>
          <title>Photogram</title>
          <link rel="icon" href="/fav.icon.ico"></link>
        </Head>

        <div className="mt-4 p-2 mx-auto   items-center">
          <div className="flex items-center justify-center mb-4">
            <div>
              <button
                onClick={() => {
                  setVisiblePage("explore");
                }}
                className="text-white p-2 rounded bg-blue-400 mr-4"
              >
                Explore
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setVisiblePage("following");
                }}
                className="text-white p-2 rounded bg-blue-400"
              >
                Following
              </button>
            </div>
          </div>

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
      </div>
    </div>
  );
}

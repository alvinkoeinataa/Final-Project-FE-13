import Head from "next/head";

import { useState } from "react";

import Button from "@/components/Elements/Button/Index";
import Explore from "@/components/Layouts/explore";
import { GetMyFollow } from "@/components/Layouts/getMyFollow";

export default function Home() {
  const [visiblePage, setVisiblePage] = useState("explore");

  return (
    <div>
      <div>
        <Head>
          <title>Photogram</title>
        </Head>

        <div className="mt-4 p-2 mx-auto   items-center">
          <div className="flex items-center justify-center mb-4">
            <div>
              <Button
                classname="bg-green-600 mr-4"
                onClick={() => {
                  setVisiblePage("explore");
                }}
              >
                Explore
              </Button>
            </div>
            <div>
              <Button
                classname="bg-green-600"
                onClick={() => {
                  setVisiblePage("following");
                }}
              >
                Following
              </Button>
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

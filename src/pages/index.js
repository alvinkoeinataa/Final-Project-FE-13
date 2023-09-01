import Head from "next/head";
import Login from "./login";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Photogram</title>
        <link rel="icon" href="/fav.icon.ico"></link>
      </Head>

      <Login />
    </div>
  );
}

import Head from "next/head";
import Login from "./login";
import Register from "./register";
import Product from "./product";

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

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Bottomnav from "@/components/Layouts/bottomnav";
import YourFollow from "@/components/Layouts/yourFollow";
import Button from "@/components/Elements/Button/Index";
import Navhome from "@/components/Layouts/navhome";
// import Label from "@/components/Elements/Input/Label";

export default function CreatePost() {
  const [file, setFile] = useState("");
  const [inputFile, setInputFile] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);
  const [caption, setCaption] = useState("");
  const router = useRouter();

  const handleUpload = () => {
    const FormData = require("form-data");

    let data = new FormData();
    data.append("image", file);
    data.append("caption", caption);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/upload-image`,
      headers: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios
      .request(config)
      .then(async (response) => {
        let data = JSON.stringify({
          imageUrl: response.data.url,
          caption: caption,
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/create-post`,
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: data,
        };

        await axios
          .request(config)
          .then((res) => {
            alert(res.data.message);
            router.push(`/profile/${userId}`);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!userId || !token) {
      const a = Cookies.get("userId");
      const b = Cookies.get("token");
      setUserId(a);
      setToken(b);
    }
  }, [userId, token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="p-4 md:col-span-1 hidden md:block pt-20">
        <Navhome />
      </div>
      <div className="w-full md:col-span-2  mx-auto p-4 rounded shadow bg-white mt-8">
        <h1 className="text-2xl font-semibold mb-4">Create Post</h1>

        <h1 className="mt-8 mb-2">Choose your image</h1>
        <input
          type="file"
          className="mb-2"
          value={inputFile}
          onChange={(e) => {
            setFile(e.target.files[0]);
            setInputFile(e.target.value);
          }}
        />

        {/* <Label classname="mt-10">Caption</Label> */}
        <h2>Caption</h2>
        <input type="text" className="mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter caption" value={caption} onChange={(e) => setCaption(e.target.value)} />

        <Button onClick={handleUpload}>Upload</Button>
      </div>
      <div className="mt-20">
        <YourFollow />
      </div>

      <Bottomnav />
    </div>
  );
}

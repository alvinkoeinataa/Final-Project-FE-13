import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function CreatePost() {
  const [file, setFile] = useState("");
  const [inputFile, setInputFile] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);
  const [caption, setCaption] = useState("");
  const router = useRouter();
  // console.log(file);

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
        console.log("data =", data);
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
            // console.log(res.data);

            alert(res.data.message);
            router.push(`/dash`);
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
      const a = localStorage.getItem("userId");
      const b = localStorage.getItem("token");
      setUserId(a);
      setToken(b);
    }
  }, [userId, token]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
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

      <div className="mt-8">
        <label htmlFor="">Caption</label>
      </div>

      <input type="text" className="mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter caption" value={caption} onChange={(e) => setCaption(e.target.value)} />

      <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
        Upload
      </button>
    </div>
  );
}

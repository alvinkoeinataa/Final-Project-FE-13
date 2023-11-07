import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Navhome from "@/components/navhome";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const [imageUrl, setImageUrl] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);
  const [caption, setCaption] = useState("");

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

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
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update-post/${id}`,
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((res) => {
            alert(res.data.message);
            router.push(`/`);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/post/${id}`, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      setCaption(response.data.data.caption);
      setUserId(Cookies.get("userId"));
      setToken(Cookies.get("token"));
      setImageUrl(response.data.data.imageUrl);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="p-4 md:col-span-1 hidden md:block pt-20">
        <Navhome />
      </div>
      <div className="max-w-md mx-auto p-4 w-[600px] bg-white rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Update Post</h1>

        <img className="w-full h-70 object-cover rounded" src={imageUrl} alt="Post" />
        <input
          type="file"
          className="mb-2 mx-auto p-4"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
              setFile(selectedFile);
              setImageUrl(URL.createObjectURL(selectedFile));
            } else {
              setFile(null);
            }
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
    </div>
  );
}

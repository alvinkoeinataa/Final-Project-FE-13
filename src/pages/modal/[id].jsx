import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import UserPost from "@/components/userPost";
import { useRouter } from "next/router";
import Navhome from "@/components/navhome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Modal = () => {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  console.log(post);

  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/post/${id}`, {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        // response.data.data.totalLikes = post.totalLikes;
        // response.data.data.isLike = post.dataisLike;

        setPost(response.data.data);
        setUser(response.data.data.user);
        setComment(response.data.data.comments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const deletePost = () => {
    axios({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/delete-post/${id}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
      },
    })
      .then((response) => {
        console.log(response);
        alert(response.data.message);
        router.push(`/profile/${post.user.id}`);
      })
      .catch((error) => {
        console.error(error);
        alert("Error, reload the page!");
      });
  };

  if (loading) {
    return <p>Loading...</p>; // Tampilkan pesan loading saat data sedang diambil
  }

  return (
    <>
      <div className="p-4 md:col-span-1 hidden md:block pt-20">
        <Navhome />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-1/4 h-1/4">
          <UserPost post={post} />

          {post.totalLikes}
          {/* <img src={post.user.profilePictureUrl} alt="" className="rounded-full w-6" />
          {post.user.username}
          <img src={post.imageUrl} alt="" />
          <img src={post.user.profilePictureUrl} alt="" className="rounded-full w-6" />
          {post.user.username}
          {post.caption}
          {post.totalLikes} */}

          <div className="flex flex-row">
            {userId === user.id && (
              <button onClick={deletePost}>
                <FontAwesomeIcon icon={faTrash} className="mr-4 w-8" />
              </button>
            )}
            {userId === user.id && (
              <Link href={`/updatepost/${id}`}>
                <FontAwesomeIcon icon={faPenSquare} className="w-8" />
              </Link>
            )}
          </div>
        </div>

        <div>
          {comment.map((item, index) => (
            <div key={index} className="flex">
              <img src={item.user.profilePictureUrl} alt="" className="w-6 h-6 rounded-full mr-6" />
              {item.user.username} = {item.comment}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Modal;

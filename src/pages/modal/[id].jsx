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
  const [post, setPost] = useState("");
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const userId = Cookies.get("userId");

  const [postModal, setPostModal] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  // console.log(post);
  console.log(postModal);
  // console.log(userPosts);
  // console.log(post);

  // Fetch user posts only when `id` changes

  useEffect(() => {
    // Fetch data for the current post
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/post/${id}`, {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        setPost(response.data.data);
        setUser(response.data.data.user);
        setComment(response.data.data.comments);
        setLoading(false);

        // Find the matching post in userPosts
        const matchingPost = userPosts.find((userPost) => userPost.id === id);

        if (matchingPost) {
          // If a matching post is found, extract isLike and totalLikes
          const { isLike, totalLikes } = matchingPost;

          // Create a copy of the response data and add isLike and totalLikes
          const updatedPostModal = {
            ...response.data,
            isLike,
            totalLikes,
          };

          setPostModal(updatedPostModal);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, userPosts]);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users-post/${userId}?size=10&page=1`, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      const data = response.data;
      setUserPosts(data.data.posts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  // Fetch userPosts only when the component initially mounts
  useEffect(() => {
    fetchUserPosts();
  }, []);

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
      {/* {userPosts.map((item) => item.caption)} */}

      <div className="flex flex-col items-center">
        <div className="w-1/4 h-1/4">
          {/* <UserPost post={post} /> */}
          {postModal.totalLikes} likes
          <img src={post.user.profilePictureUrl} alt="" className="rounded-full w-6" />
          {post.user.username}
          <img src={post.imageUrl} alt="" />
          <img src={post.user.profilePictureUrl} alt="" className="rounded-full w-6" />
          {post.user.username}
          {post.caption}
          {post.totalLikes}
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

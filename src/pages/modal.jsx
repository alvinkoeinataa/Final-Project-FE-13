import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Cookies from "js-cookie";
import UserPost from "@/components/userPost";

const Explore = () => {
  const [post, setPost] = useState([]);
  const [user, setuser] = useState({});
  const [comment, setComment] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/post/4f9b404e-7a99-4ae5-8572-872dfbc39f90`, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      // console.log(response.data.data);
      setPost(response.data.data);
      setuser(response.data.data.user);
      setComment(response.data.data.comments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* <h1>{post.userId}</h1> */}
      <div>
        <UserPost post={post} />
      </div>

      <h1>
        {comment.map((item, index) => (
          <div key={index}>
            <div className="flex items-center">
              <img src={item.user.profilePictureUrl} alt="" className="w-6 h-6 rounded-full mr-6" />
              {item.user.username}..
              {item.comment}
            </div>
          </div>
        ))}
      </h1>
    </div>
  );
};

export default Explore;

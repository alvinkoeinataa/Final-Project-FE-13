import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navhome from "@/components/navhome";

const ProfilePage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userFollowing, setUserFollowing] = useState({});
  const [userFollowers, setUserFollowers] = useState({});
  // const [isFollow, setIsFollow] = useState()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}`, {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        const data = response.data;

        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

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

    const fetchUserFollowing = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/following/${userId}?size=10&page=1`, {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        const data = response.data;
        setUserFollowing(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserFollowers = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/followers/${userId}?size=10&page=1`, {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        const data = response.data;
        setUserFollowers(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
      fetchUserPosts();

      fetchUserFollowing();
      fetchUserFollowers();
    }
  }, [userId]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navhome />
      <div className="w-3/4 mx-auto">
        <div className="mt-4 flex flex-col md:flex-row items-center">
          <img className="w-20 h-20 rounded-full mb-4 md:mb-0" src={userData.profilePictureUrl} alt="Profile" />

          <div className="md:ml-4">
            <p className="text-xl font-semibold">{userData.username}</p>
            <p className="text-gray-600 mb-1">{userData.name}</p>
            <p className="text-gray-600 mb-1">{userData.bio}</p>
            <p className="text-gray-600">{userData.website}</p>
          </div>

          <div className="flex mt-4 md:mt-0 md:ml-auto">
            <div className="mr-4">
              <p className="font-semibold">{userFollowing?.totalItems || "0"}</p>
              <p className="text-gray-600">Following</p>
            </div>
            <div>
              <p className="font-semibold">{userFollowers?.totalItems || "0"}</p>
              <p className="text-gray-600">Followers</p>
            </div>
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">User Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
          {userPosts.map((post) => (
            <div key={post.id}>
              <img className="w-full h-40 object-cover rounded" src={post.imageUrl} alt="Post" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

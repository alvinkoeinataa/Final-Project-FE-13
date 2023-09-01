import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userFollowing, setUserFollowing] = useState({});
  const [userFollowers, setUserFollowers] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}`, {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = response.data;
        // console.log("User Posts Data:", data);
        setUserPosts(data.data.posts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    const fetchUserFollowing = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/my-following?size=10&page=1`, {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/my-followers?size=10&page=1`, {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  // console.log(userFollowing);
  return (
    <div className="p-8">
      <div className="mt-4 flex items-center">
        <img className="w-20 h-20 rounded-full mr-4" src={userData.profilePictureUrl} alt="gambar" />

        <div>
          <p className="text-xl font-semibold">{userData.username}</p>
          <p className="text-gray-600 mb-1">{userData.name}</p>
          <p className="text-gray-600">{userData.bio}</p>
          <p className="text-gray-600">{userData.website}</p>
        </div>

        <div className="mx-8">{userFollowing?.totalItems || "0"} following</div>
        <div>{userFollowers?.totalItems || "0"} followers</div>
      </div>

      <h2 className="mt-8 text-2xl font-semibold">User Posts</h2>
      <div className="grid grid-cols-3 mt-4">
        {userPosts.map((post) => (
          <div key={post.id} className="p-2">
            <img className="w-full h-40 object-cover rounded" src={post.imageUrl} alt="gambar" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;

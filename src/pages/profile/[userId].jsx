import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navhome from "@/components/navhome";
import Modal from "@/components/Modal";
import Link from "next/link";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Bottomnav from "@/components/bottomnav";

const ProfilePage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userFollowing, setUserFollowing] = useState({});
  const [userFollowers, setUserFollowers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState("");

  const userIds = Cookies.get("userId");

  const defaultModalData = {
    imageUrl: "",
    caption: "",
    isLike: "",
    totalLikes: "",
    comments: [],
  };
  const [activeModalData, setActiveModalData] = useState({ ...defaultModalData });

  const [isFollow, setIsFollow] = useState(false);
  const [totalPost, setTotalPost] = useState({});

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
        setTotalPost(data.data);
        // console.log(data.data.posts);
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

  const followUser = async (userId) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/follow/`,
        { userIdFollow: userId },
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setIsFollow(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      const response = await axios.request({
        method: "delete",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/unfollow/${userId}`,
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        data: "",
      });

      setIsFollow(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getComments = async (postId) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/post/${postId}`, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      // update only comment
      setUser(response.data.data);
      setActiveModalData((prevState) => ({ ...prevState, comments: response.data.data.comments }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = (post) => {
    setActiveModalData((prevState) => ({ ...prevState, ...post, ...post.user }));
    getComments(post.id);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveModalData({ ...defaultModalData });
    setIsModalOpen(false);
  };

  const deletePost = () => {
    axios({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/delete-post/${user.id}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
      },
    })
      .then((response) => {
        alert(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert("Error, reload the page!");
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="p-4 md:col-span-1 hidden md:block pt-20">
        <Navhome />
      </div>

      <div className="w-3/4 mx-auto md:col-span-3">
        <div className="mt-4 flex flex-col md:flex-row items-center">
          <img className="w-20 h-20 rounded-full mb-4 md:mb-0" src={userData.profilePictureUrl} alt="Profile" />

          <div className="md:ml-4">
            <p className="text-xl font-semibold">{userData.username}</p>
            <p className="text-gray-600 mb-1">{userData.name}</p>

            <p className="text-gray-600">{userData.website}</p>
          </div>

          <div className="flex mt-4 md:mt-0 md:ml-auto">
            <div className="mr-4">
              <p className="font-semibold">{userFollowing?.totalItems || "0"} </p>
              <p className="text-gray-600">Following</p>
            </div>
            <div className="mr-4">
              <p className="font-semibold">{userFollowers?.totalItems || "0"}</p>
              <p className="text-gray-600">Followers</p>
            </div>

            <div>
              <p className="font-semibold">{totalPost.totalItems}</p>
              <p className="text-gray-600">posts</p>
            </div>
          </div>
        </div>

        {userIds !== userId ? (
          !isFollow ? (
            <>
              <button className="p-2 bg-black text-white" onClick={() => followUser(userId)}>
                Follow
              </button>
            </>
          ) : (
            <>
              <button className="p-2 bg-blue-400" onClick={() => unfollowUser(userId)}>
                Unfollow
              </button>
            </>
          )
        ) : (
          ""
        )}

        <h2 className="mt-8 text-2xl font-semibold">User Posts</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
          {userPosts.map((post) => (
            <div
              key={post.id}
              onClick={(e) => {
                openModal(post);
              }}
            >
              {/* <Link href={`/modal/${post.id}`}> */}
              <Image className="w-full h-40 rounded" src={post.imageUrl} alt="Post" />
              {/* {post.totalLikes} */}
              {/* </Link> */}
            </div>
          ))}

          <Modal isOpen={isModalOpen} closeModal={closeModal}>
            <div className="pb-6 ">
              {activeModalData.user && (
                <div className="flex flex-row">
                  <Image src={activeModalData.user.profilePictureUrl} alt="" className="w-8 h-8 rounded-full mr-4" />
                  <h1 className="mt-1">{activeModalData.user.username}</h1>
                </div>
              )}
              <div className="flex items-center justify-center">
                <img src={activeModalData.imageUrl} alt="" className="w-3/4 h-1/8" />
              </div>
              {activeModalData.totalLikes} likes
              <br />
              <div className="flex flex-row">
                {userIds === activeModalData.id && (
                  <button onClick={deletePost}>
                    <FontAwesomeIcon icon={faTrash} className="mr-4 w-6 my-3" />
                  </button>
                )}
                {userIds === activeModalData.id && (
                  <Link href={`/updatepost/${user.id}`}>
                    <FontAwesomeIcon icon={faPenSquare} className="w-6 my-3" />
                  </Link>
                )}
              </div>
              {activeModalData.user && (
                <div className="flex flex-row">
                  <Image src={activeModalData.user.profilePictureUrl} alt="gambar" className="rounded-full mr-4 w-6 h-6" />
                  {/* <img src={activeModalData.user.profilePictureUrl} alt="" className="w-6 h-6 rounded-full mr-4" /> */}
                  <h3 className="ml-2 mr-6 font-bold">{activeModalData.user.username}</h3>
                  <h3 className="">{activeModalData.caption}</h3>
                </div>
              )}
              {/* <br />
            isLike: {activeModalData.isLike ? "true" : "false"}
            <br />
            <br /> */}
              {activeModalData.comments.map((item, index) => (
                <div key={index} className="flex">
                  {/* <img src={item.user.profilePictureUrl} alt="" className="w-6 h-6 rounded-full mr-6" /> */}
                  <Image src={item.user.profilePictureUrl} alt="" className="w-6 h-6 rounded-full mr-6" />
                  <h1 className="font-bold mr-6">{item.user.username} </h1> {item.comment}
                </div>
              ))}
            </div>
          </Modal>
        </div>
      </div>

      <Bottomnav />
    </div>
  );
};

export default ProfilePage;

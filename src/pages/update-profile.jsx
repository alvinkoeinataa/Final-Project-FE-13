import axios from "axios";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Navhome from "@/components/Layouts/navhome";
import Bottomnav from "@/components/Layouts/bottomnav";
import YourFollow from "@/components/Layouts/yourFollow";
import Button from "@/components/Elements/Button/Index";

function UpdateProfile() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  const [file, setFile] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}`, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setUserData(data.data);
      formik.setValues({
        name: data.data.name,
        username: data.data.username,
        email: data.data.email,
        profilePictureUrl: data.data.profilePictureUrl,
        phoneNumber: data.data.phoneNumber,
        bio: data.data.bio,
        website: data.data.website,
      });
      setImageUrl(data.data.profilePictureUrl);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      phoneNumber: "",
      bio: "",
      website: "",
    },

    onSubmit: async (values) => {
      try {
        // upload image (if user select new image)
        let newImageUrl = "";
        if (file) {
          let data = new FormData();
          data.append("image", file);

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
          let resUpload = await axios.request(config);
          newImageUrl = resUpload.data.url;
        }

        // update data
        let data = JSON.stringify({
          name: values.name,
          username: values.username,
          email: values.email,
          profilePictureUrl: newImageUrl.length > 0 ? newImageUrl : imageUrl,
          phoneNumber: values.phoneNumber,
          bio: values.bio,
          website: values.website,
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update-profile`,
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            alert(response.data.message);
            router.push("/");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (!userId || !token) {
      const a = Cookies.get("userId");
      const b = Cookies.get("token");
      setUserId(a);
      setToken(b);
    }

    if (userId && token) {
      fetchUserData();
    }
  }, [userId, token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 ">
      <div className="p-4 md:col-span-1 hidden md:block pt-20 ">
        <Navhome />
      </div>

      <div className="mt-6 md:col-span-2 flex flex-col items-center pb-6">
        <h1 className="text-2xl">Update Profile</h1>
        {imageUrl && (
          <div className="flex items-center justify-center">
            <img src={imageUrl} alt="Profile" className="w-48 h-48 object-cover rounded-full" />
          </div>
        )}
        <input
          type="file"
          className="mb-2 mx-auto p-2 flex items-center justify-center"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
          }}
        />

        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto space-y-4">
          {Object.keys(formik.initialValues).map((value, index) => (
            <div className="flex items-center mb-2" key={index}>
              <label htmlFor={value} className="block font-semibold w-1/3">
                {value.charAt(0).toUpperCase() + value.slice(1)}:
              </label>
              <input
                className="w-2/3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-1"
                id={value}
                name={value}
                type={value === "password" ? "password" : "text"}
                placeholder={`Enter your ${value}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[value]}
              />
              {formik.touched[value] && formik.errors[value] ? <div className="text-red-500 mt-1 text-sm">{formik.errors[value]}</div> : null}
            </div>
          ))}

          <Button classname="bg-blue-700 w-full">Update</Button>
        </form>
      </div>
      <div className="mt-20">
        <YourFollow />
      </div>
      <Bottomnav />
    </div>
  );
}

export default UpdateProfile;

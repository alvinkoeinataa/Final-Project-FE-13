import axios from "axios";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

import { useRouter } from "next/router";

function UpdateProfile() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

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
      }); // mengubah value data ke formik
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
      profilePictureUrl: "",
      bio: "",
      website: "",
    },

    // ngirim ke backend
    onSubmit: (values) => {
      let data = JSON.stringify({
        name: values.name,
        username: values.username,
        email: values.email,
        profilePictureUrl: values.profilePictureUrl,
        phoneNumber: values.phoneNumber,
        bio: values.bio,
        website: values.website,
      }); // data yg diedit masuk ke sini

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
          router.push("/dash");
        })
        .catch((error) => {
          // alert(error.message);
          alert(error.response.data.message);
        });
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
    <div className="mt-8">
      <h1 className="text-2xl text-center mb-8 text-bold">Update Profile</h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto space-y-4">
        {Object.keys(formik.initialValues).map((value, index) => (
          <div className="flex items-center mb-4" key={index}>
            <label htmlFor={value} className="block font-semibold w-1/3">
              {value.charAt(0).toUpperCase() + value.slice(1)}:
            </label>
            <input
              className="w-2/3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2"
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

        <button type="submit" className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
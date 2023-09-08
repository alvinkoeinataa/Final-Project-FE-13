// import React, { useEffect } from "react";
// import axios from "axios";

// export const GetMyFollowingPost = () => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/following-post?size=10&page=1`, {
//         headers: {
//           apiKey: process.env.NEXT_PUBLIC_API_KEY,
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       const data = response.data;
//       const postsData = data.data.posts;

//       console.log("API Response Data:", response);
//       console.log(data.data.posts);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//
//     fetchData();
//   }, []);

//   return <div></div>;
// };

import axios from "axios";

const BASE_URL = "https://photo-sharing-api-bootcamp.do.dibimbing.id";
const API_KEY = "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b";

export const GetMyFollowingPost = () => {
  const getData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/following-post?size=10&page=1`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsdmlua29laW5hdGFAZ21haWwuY29tIiwidXNlcklkIjoiODBhNWMzMWUtOTZjMS00YWFhLWJlYTctYWFhMWExYmM1MDI2Iiwicm9sZSI6ImdlbmVyYWwiLCJpYXQiOjE2OTM0ODg3MDF9.vfSu2bOZ8l4fzMrqBgIYSSyDeceV8VsS1pQstI0mQU0`,
          apiKey: API_KEY,
        },
      });

      const data = response.data;

      console.log("API Response Data:", data);
      console.log(data.data.posts);

      // Di sini Anda dapat melakukan apapun dengan data posts yang Anda peroleh
      // Misalnya, Anda dapat memasukkannya ke dalam state React, menggambarnya di halaman, dll.
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Panggil fungsi untuk mendapatkan data postingan yang Anda inginkan
  getData();
};

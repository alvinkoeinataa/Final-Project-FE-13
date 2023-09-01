import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState("");

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(5, "Minimum 8 characters").required("Required"),
    }),

    onSubmit: (values) => {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/login`, values, {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
          },
          data: {
            email: values.email,
            password: values.password,
          },
        })
        .then((res) => {
          const token = res.data.token;
          console.log(token);
          localStorage.setItem("token", token);

          const name = res.data.user.name;
          localStorage.setItem("name", name);

          const userId = res.data.user.id;
          localStorage.setItem("userId", userId);

          router.push(`/dash`);
        })
        .catch((error) => {
          console.error(error);
          alert("Invalid email and/or password.");
        });
    },
  });

  useEffect(() => {
    if (!userId || !token) {
      const a = localStorage.getItem("userId");
      const b = localStorage.getItem("token");
      setUserId(a);
      setToken(b);
    }
  }, [userId, token]);

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-blue-400">
        <div className="bg-white p-8 rounded shadow-md w-150">
          <div className="text-center mb-4">
            <h3 className="text-3xl font-semibold">Photogram</h3>
          </div>
          <h5 className="text-center text-lg font-medium mb-4">Log In</h5>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Type your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <div className="text-red-500 mt-1">{formik.errors.email}</div> : null}
            <label htmlFor="password" className="mt-2 mb-1 block">
              Password
            </label>
            <input
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="Type your password"
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? <div className="text-red-500 mt-1">{formik.errors.password}</div> : null}
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-500" onChange={togglePassword} />
                <span className="ml-2">Show Password</span>
              </label>
            </div>
            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Log In
            </button>
          </form>

          <div>
            <p className="mt-4">
              Dont have an account?{" "}
              <span>
                <Link href="/register" className="text-blue-600">
                  Sign up here.
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-center text-light mt-8">
        © All Rights Reserved 2023. Created by <b>Alvin Koeinata</b>.
      </div>
    </>
  );
}

export default Login;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Button from "@/components/Elements/Button/Index";
import { Photogram } from "@/components/Layouts/photogram";

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
      password: Yup.string().min(5, "Minimum 5 characters").required("Required"),
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
          Cookies.set("token", token);

          const name = res.data.user.name;
          Cookies.set("name", name);

          const userId = res.data.user.id;
          Cookies.set("userId", userId);

          router.push(`/`);
        })
        .catch((error) => {
          console.error(error);
          alert("Invalid email and/or password.");
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
  }, [userId, token]);
  return (
    <div>
      <div className="h-screen md:flex bg-green-600">
        <Photogram />

        <div className="flex justify-center items-center w-full h-screen">
          <div className="bg-white p-4 rounded w-3/4 sm:w-1/2 md:w-1/2 lg:w-1/2 shadow-2xl">
            <h5 className="text-center text-xl font-medium mb-2">Login</h5>
            <form onSubmit={formik.handleSubmit}>
              {Object.keys(formik.initialValues).map((value, index) => (
                <div className="mb-2" key={index}>
                  <div className="flex flex-row">
                    <label htmlFor={value} className="block mb-1 mr-4">
                      {value.charAt(0).toUpperCase() + value.slice(1)}:
                    </label>
                    {formik.touched[value] && formik.errors[value] ? <div className="text-red-400 mb-2">{formik.errors[value]}</div> : null}
                  </div>

                  <input
                    className="w-full p-2 border rounde"
                    id={value}
                    name={value}
                    type={value !== "password" || showPassword ? "text" : "password"}
                    autoComplete={value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[value]}
                  />
                </div>
              ))}

              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox text-blue-500" onChange={togglePassword} />
                  <span className="ml-2">Toogle Password</span>
                </label>
              </div>

              <Button>Log in</Button>
            </form>

            <div className="mt-4">
              <p>
                Dont have an account
                <span>
                  <Link href="/register" className="text-blue-600 ml-4">
                    Register
                  </Link>
                </span>
              </p>
            </div>
            {/* <InputForm label="Email" type="text" id={value} name={value} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

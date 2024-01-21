//

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Photogram } from "@/components/photogram";

function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      phoneNumber: "",
      bio: "",
      website: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(5, "Must be 5 characters or more").max(15, "Must be less than 15 characters").required("Required"),
      username: Yup.string().min(5, "Must be 5 characters or more").max(15, "Must be less than 15 characters").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(5, "Must be 5 characters or more")
        .max(15, "Must be less than 15 characters")

        .required("Required"),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password")], "Password does not match")
        .required("Required"),
      phoneNumber: Yup.string()
        .min(10, "Must be 10 characters or more")
        .max(12, "Must be 12 characters or less")
        .matches(/^[0-9]{10,12}$/, "Must be in digit")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/register`,
        values,
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
        },
        data: {
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
          passwordRepeat: values.passwordRepeat,
          phoneNumber: values.phoneNumber,
          profilePictureUrl: "",
          bio: values.bio,
          website: values.website,
        },
      })
        .then((res) => {
          // console.log(res);

          alert(res.data.message);
          if (res.data.code === "200") {
            router.push("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Registration failed. Please try again!");
        });
    },
  });
  return (
    <div>
      <div className="h-screen md:flex bg-lime-200">
        <Photogram />

        <div className="flex justify-center items-center w-full sm:w-full bg-lime-200 py-6">
          <div className="bg-white p-8 rounded w-3/4 md:w-1/2 shadow-2xl">
            <h5 className="text-center text-xl font-medium mb-2">Register Account</h5>
            <form onSubmit={formik.handleSubmit}>
              {Object.keys(formik.initialValues).map((value, index) => (
                <div className="mb-2 " key={index}>
                  <div className="flex flex-row">
                    <label htmlFor={value} className="block font-semibold mr-4">
                      {value.charAt(0).toUpperCase() + value.slice(1)}:
                    </label>

                    {formik.touched[value] && formik.errors[value] ? <div className="text-red-400">{formik.errors[value]}</div> : null}
                  </div>

                  <input
                    className="w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id={value}
                    name={value}
                    type={(value === "password" && showPassword) || (value === "passwordRepeat" && showPassword) ? "password" : "text"}
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

              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit" value="Register">
                Register
              </button>
            </form>

            <div>
              <p>
                Already have an account?{" "}
                <span>
                  <Link href="/login" className="text-blue-600">
                    Login
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

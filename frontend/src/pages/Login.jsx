import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state to disable button
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onchangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Set loading to true when submitting the form

    try {
      const res = await axiosInstance.post("user/login", {
        email: data.email,
        password: data.password,
      });

      console.log("Login successful:", res.data);
      dispatch(login(res.data.data));
      toast.success("Login successful!...");
      navigate("/notes");
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
        toast.error("Login failed! Please check your credentials.");
      } else if (error.request) {
        console.error("No response from server:", error.request);
        toast.error("Server is not responding. Please try again later.");
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false); // Reset loading state after the request is complete
    }
  };

  return (
    <div className="flex items-center justify-center my-auto h-[90vh]">
      <div className="card bg-base-100 w-96 shadow-xl ">
        <div></div>
        <div className="border-red-500 ">
          <p className="w-full text-center text-3xl text-pink-400 py-5">
            LOGIN
          </p>
          <div className="m-4">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                name="email"
                onChange={onchangehandler}
                className="grow"
                value={data.email}
                placeholder="Email"
              />
            </label>
          </div>

          <div className="m-4">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                name="password"
                onChange={onchangehandler}
                className="grow"
                value={data.password}
                placeholder="password"
              />
            </label>
          </div>

          <div className="w-full items-center justify-center flex mt-10">
            <button
              className={`btn text-xl btn-secondary px-6 ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              onClick={submitHandler}
              disabled={isLoading} // Disable the button when loading
            >
              Log In
              {isLoading && (
                <span className="loading loading-dots loading-md"></span>
              )}
            </button>
          </div>

          <p className="font-md m-4">
            Do you not have an account?{" "}
            <Link
              className="hover:underline hover:text-pink-400 text-md"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

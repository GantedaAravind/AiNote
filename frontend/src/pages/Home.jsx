import React, { useEffect } from "react";

// Import your user slice action
import axiosInstance from "../config/axiosInstance";
import { login } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function fetchUserData() {
    try {
      const response = await axiosInstance.get("/user/me");
      console.log(response.data);

      dispatch(login(response.data.user)); // Store response in Redux
      navigate("/notes");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  useEffect(() => {
    fetchUserData();
    console.log("completed");
  }, []);

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              AI Note is an intelligent note-taking application that leverages
              speech-to-text technology, allowing users to effortlessly capture
              their thoughts through voice input. With seamless image uploads
              and a clean, user-friendly interface, AI Note enhances
              productivity by making note creation faster and more intuitive.
              Organize, store, and access your notes anytime with ease.
            </p>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useRef, useState } from "react";
import { IoMdImage } from "react-icons/io";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import loadNotes from "../utils/loadNotes";
import MicroPhone from "./MicroPhone";
import uploadImage from "../utils/uploadImage";

const getTitleFromContent = (content) => {
  return content.split(" ").slice(0, 3).join(" ") || "Untitled";
};

const UserInput = () => {
  const [content, setContent] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false); // Track image upload
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImageLoading(true); // Start loading before upload

    try {
      const uploadImageCloudinary = await uploadImage(file);
      console.log(uploadImageCloudinary.url);
      setImageUrls((prev) => [...prev, uploadImageCloudinary.url]);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsImageLoading(false); // Stop loading after upload
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const changeHandler = (event) => {
    setContent(event.target.value);
  };

  const sendNotes = async () => {
    setIsLoading(true);

    try {
      console.log(content);
      const res = await axiosInstance.post("note/createnotes", {
        title: getTitleFromContent(content),
        content,
        imageUrls,
      });
      console.log(res.data);
      dispatch(loadNotes());
      toast.success(res.data.message);
      setImageUrls([]);
      setContent("");
    } catch (error) {
      if (error.response) {
        console.error("Failed:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        toast.error("Server is not responding. Please try again later.");
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute bottom-10 shadow-md rounded-x-full rounded-r-full px-1 right-0 flex items-end mr-20">
      <div className="relative">
        <div>
          {imageUrls.map((imageUrl, index) => (
            <div className="avatar m-1" key={index}>
              <div className="w-14 rounded">
                <img src={imageUrl} alt="Uploaded" />
              </div>
            </div>
          ))}
        </div>

        <div className="shadow-xl relative flex gap-3 justify-center items-center">
          {/* Image Upload Button */}
          <button
            className="btn btn-primary btn-circle flex items-center p-2 text-3xl"
            disabled={isImageLoading} // Disable when uploading
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {isImageLoading ? ( // Show spinner while uploading
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              <IoMdImage
                className="text-2xl cursor-pointer"
                onClick={handleIconClick}
              />
            )}
          </button>

          {/* Text Input */}
          <textarea
            rows="2"
            name="content"
            value={content}
            onChange={changeHandler}
            className="p-4 text-xl resize-none bg-transparent outline-none w-[60vw] placeholder:text-gray-400 placeholder:italic placeholder:text-lg"
            placeholder="Write your thoughts, ideas, or a note here..."
          ></textarea>

          {/* Microphone or Submit Button */}
          {content.length === 0 || isListening ? (
            <div className="tooltip" data-tip="Start Recording...">
              <MicroPhone
                setIsListening={setIsListening}
                setContent={setContent}
              />
            </div>
          ) : (
            <div className="tooltip" data-tip="Create">
              <button
                className="btn btn-primary btn-circle"
                onClick={sendNotes}
                disabled={isLoading} // Disable when sending
              >
                <span className="text-4xl">
                  {isLoading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    <IoArrowUpCircleOutline />
                  )}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInput;

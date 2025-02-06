import React, { useState } from "react";
import dateFormater from "../config/dateFromatter";
import { FaPenToSquare, FaRegStar, FaStar, FaClipboard } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";
import loadNotes from "../utils/loadNotes";
import { useDispatch } from "react-redux";

const Note = ({ title, content, _id, createdAt, isFavorite, imageUrls }) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({ title, content, isFavorite, imageUrls });
  const dispatch = useDispatch();

  const deleteNotes = async () => {
    try {
      const res = await axiosInstance.delete(`note/deletenotes/${_id}`);
      console.log(res.data);
      dispatch(loadNotes());
      toast.success("Note deleted successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Deletion failed:", error.response.data);
        toast.error(
          error.response.data.message ||
            "Failed to delete note. Please try again."
        );
      } else if (error.request) {
        console.error("No response from server:", error.request);
        toast.error(
          "Unable to connect to the server. Please check your internet connection."
        );
      } else {
        console.error("Error:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  async function updateNotes() {
    console.log(data);
    try {
      const res = await axiosInstance.put(`note/updatenotes/${_id}`, {
        title: data.title,
        content: data.content,
        isFavorite: data.isFavorite,
        imageUrls: data.imageUrls,
      });
      console.log("Update response:", res.data);
      dispatch(loadNotes());
      toast.success("Note updated successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Update failed:", error.response.data);
        toast.error(
          error.response.data.message ||
            "Failed to update note. Please try again."
        );
      } else if (error.request) {
        console.error("No response from server:", error.request);
        toast.error(
          "Unable to connect to the server. Please check your internet connection."
        );
      } else {
        console.error("Error:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  }

  function onChangeHandler(event) {
    const { name, value } = event.target;
    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }
  function changeFavorite(isFavorite) {
    setData((prevData) => {
      return { ...prevData, isFavorite };
    });
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.content).then(
      () => {
        toast.success("Content copied to clipboard!");
      },
      (err) => {
        toast.error("Failed to copy content to clipboard.");
      }
    );
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={`my_modal_${_id}`} className="modal ">
        <div className="modal-box  w-[60vw]">
          <button
            className="btn absolute right-10 text-2xl"
            onClick={() => setEdit(true)}
          >
            <FaPenToSquare />
          </button>
          <div className="modal-action absolute right-10 top-14 ">
            <form method="dialog">
              <button
                className="btn btn-secondary  text-2xl"
                onClick={deleteNotes}
              >
                <MdDelete />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4 ">
            <p className="text-sm">Title</p>
            <input
              name="title"
              value={data.title}
              onChange={onChangeHandler}
              disabled={!edit}
              className=" input  bg-transparent font-bold text-lg"
            ></input>
            <button
              onClick={() => changeFavorite(!data.isFavorite)}
              className="text-2xl"
            >
              {data.isFavorite ? <FaStar /> : <FaRegStar />}
            </button>
          </div>
          <p className="text-sm mt-5">Content</p>

          <textarea
            value={data.content}
            onChange={onChangeHandler}
            name="content"
            disabled={!edit}
            className="block textarea resize-none row-5  w-80 bg-transparent py-4"
          ></textarea>

          <div>
            {imageUrls && imageUrls.length != 0 && (
              <div className="mt-5">
                <p className="text-xl font-bold">Images</p>
                <div className="flex items-center">
                  {imageUrls.map((imageurl) => {
                    return (
                      <div className="avatar m-1" key={imageurl}>
                        <div className="w-14 rounded">
                          <img src={imageurl} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button className="btn btn-accent" onClick={updateNotes}>
              save
            </button>
            <button className="btn btn-outline ml-4" onClick={copyToClipboard}>
              <FaClipboard className="text-xl" />
            </button>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>

      <div
        className="card bg-base-100 w-80 shadow-xl p-4 cursor-pointer border-2"
        onClick={() => document.getElementById(`my_modal_${_id}`).showModal()}
      >
        <p className="text-sm">{dateFormater.format(new Date(createdAt))}</p>
        <h2 className="text-2xl font-medium text-white line-clamp-1 overflow-hidden text-ellipsis mb-4">
          {title}
        </h2>
        <p className="text-sm line-clamp-4 text-ellipsis text-gray-700">
          {content}
        </p>
      </div>
    </>
  );
};

export default Note;

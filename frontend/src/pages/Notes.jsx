import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";
import { logout } from "../store/userSlice";
import UserInput from "../componets/UserInput";
import Note from "../componets/Note";
import { FaHome } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import loadNotes from "../utils/loadNotes";

const Notes = () => {
  const user = useSelector((state) => state.user);
  const [isHome, setHome] = useState(true);

  const notes = user?.user?.notes;
  const navigate = useNavigate();
  const dispath = useDispatch();

  async function logoutHandler() {
    try {
      const res = await axiosInstance.post("user/logout");
      console.log("Logout successful:", res.data);
      dispatch(logout());
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Logout failed:", error.response.data);
        toast.error("Logout failed! Please try again.");
      } else if (error.request) {
        console.error("No response from server:", error.request);
        toast.error("Server is not responding. Please try again later.");
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    }
  }

  useEffect(() => {
    dispath(loadNotes());
  }, []);

  if (user || !user.isAuthenticated) {
    navigate("/");
  }

  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side bg-slate-800 font-bold w-full">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu bg-base-100 text-base-content min-h-[90vh] w-80 p-4 text-xl">
            <Link to="/notes" className="mx-4 mt-4 mb-10  cursor-pointer">
              Ai Notes
            </Link>

            {/* Sidebar content here */}
            <li
              onClick={() => setHome(true)}
              className={
                "flex flex-row items-center gap-2 hover:cursor-pointer hover:bg-slate-900 p-3 rounded-xl " +
                (isHome ? "bg-slate-600" : "")
              }
            >
              <span className="disabled">
                <FaHome />
              </span>
              Home
            </li>
            <li
              onClick={() => setHome(false)}
              className={
                "flex flex-row items-center gap-2 hover:cursor-pointer hover:bg-slate-900 p-3 rounded-xl " +
                (!isHome ? "bg-slate-600" : "")
              }
            >
              <span className="disabled">
                <IoIosStar />
              </span>
              Favouretes
            </li>
          </ul>
          {user.isAuthenticated && (
            <div className="dropdown dropdown-top mx-4 w-[35vh] flex items-center gap-3">
              <div tabIndex={0} role="button" className="btn m-1 w-full">
                <div className="w-10 mr-3">
                  <img
                    className="rounded-full "
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
                <p>{user?.user?.name}</p>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <button
                    className="w-[35vh] font-bold text-xl"
                    onClick={logoutHandler}
                  >
                    LogOut
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="w-[75vw] absolute top-10 right-5 flex items-center flex-wrap gap-5">
        {notes &&
          isHome &&
          notes.length !== 0 &&
          notes.map((note) => {
            return (
              <Note
                key={note._id}
                _id={note._id}
                title={note.title}
                content={note.content}
                isFavorite={note.isFavorite}
                createdAt={note.createdAt}
                imageUrls={note.imageUrls}
              />
            );
          })}

        {notes &&
          !isHome &&
          notes.length !== 0 &&
          notes
            .filter((note) => note.isFavorite)
            .map((note) => {
              return (
                <Note
                  key={note._id}
                  _id={note._id}
                  title={note.title}
                  content={note.content}
                  isFavorite={note.isFavorite}
                  createdAt={note.createdAt}
                />
              );
            })}
      </div>

      <UserInput />
    </div>
  );
};

export default Notes;

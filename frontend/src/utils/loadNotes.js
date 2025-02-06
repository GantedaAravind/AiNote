import toast from "react-hot-toast";
import { addNotes } from "../store/userSlice";
import axiosInstance from "../config/axiosInstance";

function loadNotes() {
  return async function (dispath, state) {
    try {
      const res = await axiosInstance.get("/note");
      console.log(res.data);

      dispath(addNotes(res.data.notes));
    } catch (error) {
      if (error.response) {
        console.error("Error loading notes:", error.response.data);
        toast.error("Failed to load notes. Please try again.");
      } else if (error.request) {
        console.error("No response from server:", error.request);
        toast.error("Server is not responding. Please try again later.");
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    }
  };
}
export default loadNotes;

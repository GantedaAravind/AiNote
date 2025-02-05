import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/notes", element: <Notes /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <>
      <p className="text-center  bg-red-300 font-bold text-lg">OM Sri Sairam</p>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

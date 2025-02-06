import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "regenerator-runtime/runtime";

import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./componets/ErrorBoundary";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/notes", element: <Notes /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <ErrorBoundary>
      <Toaster />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;

import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import store from "./store/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

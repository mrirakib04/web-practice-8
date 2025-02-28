import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PagesRouter from "./RouterSetup/PagesRouter";
import AuthContextProvider from "./Contexts/AuthContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import "animate.css";
import "aos/dist/aos.css";
import "react-photo-view/dist/react-photo-view.css";
import "react-loading-skeleton/dist/skeleton.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <PagesRouter></PagesRouter>
      <ToastContainer></ToastContainer>
    </AuthContextProvider>
  </StrictMode>
);

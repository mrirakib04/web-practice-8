import { Outlet } from "react-router";
import Footer from "./FixedLayout/Footer";
import Navbar from "./FixedLayout/Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Contexts/AuthContextProvider";
import axios from "axios";
import Aos from "aos";
import "./App.css";

const App = () => {
  const { darkmode, handleLogout } = useContext(AuthContext);

  axios.interceptors.response.use(
    function (response) {
      // Successful response
      return response;
    },
    function (error) {
      // If the response has a 401 or 403 status code
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        handleLogout(); // Call the logout function
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    // Initialize AOS when the component mounts
    Aos.init();
  }, []);

  return (
    <div
      className={
        darkmode
          ? "flex flex-col items-center max-w-[1480px] mx-auto bg-black text-white"
          : "flex flex-col items-center max-w-[1480px] mx-auto"
      }
    >
      <Navbar></Navbar>
      <div className="sm:mt-24 mt-20"></div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default App;

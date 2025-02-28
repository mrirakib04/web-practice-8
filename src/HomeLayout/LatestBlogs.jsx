import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { Typewriter } from "react-simple-typewriter";
import { Tooltip } from "react-tooltip";
import { PiNotePencilBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Aos from "aos";

const LatestBlogs = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { darkmode, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // wishlist
  const getWishlist = async () => {
    axios
      .get(`https://mrirakib04-server-2.vercel.app/wishlist`, {
        withCredentials: true,
      })
      .then((res) => setWishlist(res.data))
      .catch((error) => {
        toast.error(`Error loading wishlist: ${error}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };
  const getLatestBlogs = () => {
    axios
      .get(`https://mrirakib04-server-2.vercel.app/latest`, {
        withCredentials: true,
      })
      .then((res) => setLatestBlogs(res.data))
      .catch((error) => {
        toast.error(`Error loading blog: ${error}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };
  useEffect(() => {
    getLatestBlogs();
  }, []);
  useEffect(() => {
    getWishlist();
  }, []);
  useEffect(() => {
    // Initialize AOS when the component mounts
    Aos.init();
  }, []);

  const handleWishlist = (blogId, blogName, blogCategory, postedBy) => {
    if (!user) {
      return navigate("/login");
    }
    const wishlistFor = user?.email;

    if (
      wishlist.some(
        (blog) => blogId === blog.blogId && user?.email === blog.wishlistFor
      )
    ) {
      return toast.info(`This blog already in your wishlist 📌`, {
        position: "top-right",
        autoClose: 2000,
        closeButton: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    const newWishlist = {
      blogId,
      blogName,
      blogCategory,
      postedBy,
      wishlistFor,
    };

    axios
      .post("https://mrirakib04-server-2.vercel.app/wishlist", newWishlist, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success(`Blog added in your wishlist 🤩`, {
            position: "top-center",
            autoClose: 2000,
            closeButton: true,
            pauseOnHover: true,
            draggable: true,
          });
          setWishlist((prevWishlist) => [...prevWishlist, newWishlist]);
        }
      })
      .catch((error) => {
        toast.error(`Something wrong! Try again. ${error.message} 💔`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  return (
    <div
      className={
        darkmode
          ? "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-t bg-purple-950 via-sky-900 from-red-950 sm:py-14 py-10 sm:px-5 text-black"
          : "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-t bg-purple-300 via-sky-200 from-red-200 sm:py-14 py-10 sm:px-5"
      }
    >
      <h2
        className={
          darkmode
            ? "md:text-5xl sm:text-3xl text-xl font-bold text-white flex items-center gap-2"
            : "md:text-5xl sm:text-3xl text-xl font-bold text-black flex items-center gap-2"
        }
      >
        Latest
        <p
          className={
            darkmode ? "text-emerald-400 italic" : "text-red-950 italic"
          }
        >
          <Typewriter
            words={["Blogs"]}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={200}
            deleteSpeed={200}
            delaySpeed={1000}
          />
        </p>
      </h2>
      <p
        className={
          darkmode
            ? "md:w-2/3 md:text-xl sm:text-lg text-base font-medium text-gray-400 mt-2 text-center"
            : "md:w-2/3 md:text-xl sm:text-lg text-base font-medium text-gray-600 mt-2 text-center"
        }
      >
        Discover the latest blogs, featuring fresh ideas, trending topics, and
        insightful stories to keep you informed and inspired every day.
      </p>
      <div className="sm:mt-8 mt-5 grid container lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center items-center gap-5">
        {latestBlogs.length > 0 ? (
          latestBlogs.map((blog) => {
            return (
              <div
                data-aos="zoom-in"
                key={blog._id}
                className={
                  darkmode
                    ? "w-full flex flex-col items-center justify-center bg-gray-700 gap-2 p-3 rounded-lg border-2 border-gray-200 shadow-lg text-white"
                    : "w-full flex flex-col items-center justify-center bg-white gap-2 p-3 rounded-lg border-2 border-gray-700 shadow-lg text-black"
                }
              >
                <div className="w-full">
                  <div className="flex flex-row gap-1 items-center">
                    <img
                      className="border-2 border-gray-500 h-10 w-10 rounded-full"
                      src={blog.userImage}
                    />
                    <h3 className="text-xl font-semibold">{blog.userName}</h3>
                  </div>
                </div>
                <PhotoProvider>
                  <PhotoView src={blog.image}>
                    <img
                      src={blog.image}
                      className={
                        darkmode
                          ? "object-cover rounded-lg w-full lg:h-48 md:h-40 sm:h-40 border-2 border-gray-400 shadow-gray-500 shadow-lg"
                          : "object-cover rounded-lg w-full lg:h-48 md:h-40 sm:h-40 border-2 border-gray-500 shadow-gray-400 shadow-lg"
                      }
                      alt={blog.blogName}
                    />
                  </PhotoView>
                </PhotoProvider>
                <h3 className="text-xl font-bold mt-5">{blog.blogName}</h3>
                <p
                  className={
                    darkmode
                      ? "text-lg font-medium text-gray-300"
                      : "text-lg font-medium text-gray-600"
                  }
                >
                  Category: {blog.category}
                </p>
                <p
                  className={
                    darkmode
                      ? "text-lg font-medium text-gray-300"
                      : "text-lg font-medium text-gray-600"
                  }
                >
                  Posted Date: {blog.publishDate}
                </p>
                <div className="w-full flex flex-wrap items-center justify-center gap-2">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="sm:py-2 py-1 sm:px-4 px-2 rounded-md bg-cyan-700 text-lg text-white font-semibold hover:bg-cyan-500 hover:shadow-md transition"
                  >
                    Explore Details
                  </Link>
                  <button
                    className="sm:py-2 py-1 sm:px-4 px-2 rounded-md bg-green-700 text-lg text-white font-semibold hover:bg-green-500 hover:shadow-md transition"
                    onClick={() =>
                      handleWishlist(
                        blog._id,
                        blog.blogName,
                        blog.category,
                        blog.userName
                      )
                    }
                  >
                    Wishlist
                  </button>
                  {blog.userEmail === user?.email && (
                    <Link
                      to={`/blog/update/${blog._id}`}
                      className="sm:text-3xl text-2xl hover:text-sky-700 transition"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Update your blog."
                    >
                      <PiNotePencilBold></PiNotePencilBold>
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <h2 className="text-xl font-medium text-center mx-auto">
            Opps! No blogs here.
          </h2>
        )}
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default LatestBlogs;

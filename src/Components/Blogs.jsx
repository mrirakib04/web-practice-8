import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { DNA } from "react-loader-spinner";
import { toast } from "react-toastify";
import Aos from "aos";
import { FaSearchPlus, FaTrashAlt } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { Tooltip } from "react-tooltip";
import { PhotoProvider, PhotoView } from "react-photo-view";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [storedBlogs, setStoredBlogs] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Dropdown
  const [isHoveredSort, setIsHoveredSort] = useState(false);

  // context
  const { darkmode, user, loading } = useContext(AuthContext);
  // sort controls
  const [sortType, setSortType] = useState("all");
  const sortWordsBTN = () => {
    setSortType("words");
  };
  const sortAllBTN = () => {
    setSortType("all");
  };

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

  //  effects
  useEffect(() => {
    // Initialize AOS when the component mounts
    Aos.init();
  }, []);
  useEffect(() => {
    getBlogs(sortType); // Fetch reviews based on current sort type
  }, [sortType]);
  useEffect(() => {
    getWishlist();
  }, []);

  // Data collecting
  const getBlogs = async (sortType) => {
    setDataLoading(true);
    let url = "https://mrirakib04-server-2.vercel.app/blogs"; // Default URL

    // Adjust the URL based on sort type
    if (sortType === "words") {
      url = "https://mrirakib04-server-2.vercel.app/words";
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setBlogs(data);
      setStoredBlogs(data);
    } catch (error) {
      toast.error(`Error loading blogs: ${error}`, {
        position: "top-right",
        autoClose: 2000,
        closeButton: true,
        pauseOnHover: true,
        draggable: true,
      });
      setBlogs([]);
      setStoredBlogs([]);
    } finally {
      setDataLoading(false);
    }
  };

  // search Blog
  const searchBlog = async (e) => {
    e.preventDefault();
    const searchText = e.target.searchText.value;

    setDataLoading(true);

    fetch(
      `https://mrirakib04-server-2.vercel.app/blogs/search?query=${searchText}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setDataLoading(false);
      }) // Update blogs with search results
      .catch((error) => {
        console.error("Error fetching search results:", error);
        toast.error(`Error search blogs: ${error}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  // Handle delete blog
  const handleDeleteBlog = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      iconColor: "red",
      confirmButtonColor: "#c22717",
      cancelButtonColor: "#038a07",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://mrirakib04-server-2.vercel.app/delete/blog?query=${id}`,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "This blog has been deleted.",
                icon: "success",
              });
              getBlogs();
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: `${error.message}`,
              icon: "error",
            });
          });
      }
    });
  };

  // Category selection options
  const categoryOptions = [
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Travel", label: "Travel" },
    { value: "Technology", label: "Technology" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Gaming", label: "Gaming" },
    { value: "Other", label: "Other" },
  ];
  // Category sorting
  const handleCategoryChange = (selectedOption) => {
    const category = selectedOption.value;
    const filteredBlogs = storedBlogs.filter(
      (blog) => blog.category === category
    );
    setBlogs(filteredBlogs);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <DNA></DNA>
      </div>
    );
  } else {
    return (
      <div
        className={
          darkmode
            ? "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-tr bg-yellow-900 via-black from-green-900 sm:py-20 py-12 sm:px-5 text-white"
            : "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-tr bg-yellow-200 via-white from-green-200 sm:py-20 py-12 sm:px-5"
        }
      >
        <h2
          className={
            darkmode
              ? "md:text-5xl sm:text-3xl text-xl font-bold text-gray-200 flex items-center gap-2"
              : "md:text-5xl sm:text-3xl text-xl font-bold text-black flex items-center gap-2"
          }
        >
          Explore
          <p
            className={
              darkmode
                ? "text-cyan-400 italic animate__animated animate__pulse animate__infinite animate__slow"
                : "text-cyan-700 italic animate__animated animate__pulse animate__infinite animate__slow"
            }
          >
            Blogs
          </p>
        </h2>
        <p
          className={
            darkmode
              ? "md:w-2/3 md:text-xl sm:text-lg text-base font-medium text-gray-400 mt-2 text-center"
              : "md:w-2/3 md:text-xl sm:text-lg text-base font-medium text-gray-600 mt-2 text-center"
          }
        >
          Explore blogs covering diverse topics, offering insights, stories, and
          ideas to inspire, educate, and connect with like-minded readers.
        </p>
        <div className="flex flex-row items-center justify-between container mx-auto my-5">
          <div className="w-fit">
            <Select
              options={categoryOptions}
              onChange={handleCategoryChange}
              placeholder="Select Category"
              isSearchable={false} // Optional: Disable search within the dropdown
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: darkmode ? "#2a2a2a" : "#f0f0f0",
                  color: darkmode ? "darkgrey" : "#000",
                  fontSize: 20,
                }),
                singleValue: (base) => ({
                  ...base,
                  color: darkmode ? "darkgrey" : "#000",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: darkmode ? "#2a2a2a" : "#fff",
                  color: darkmode ? "darkgrey" : "#000",
                }),
              }}
              className="w-full"
            ></Select>
          </div>

          <div>
            <div
              className="relative"
              onClick={() => setIsHoveredSort(!isHoveredSort)}
            >
              <button className="font-semibold text-xl">Sort </button>
              {isHoveredSort && (
                <div
                  className={
                    isHoveredSort
                      ? "flex sm:flex-row flex-col items-center gap-2 absolute z-40 py-1 mr-2 right-1"
                      : ""
                  }
                >
                  <button
                    onClick={sortAllBTN}
                    className={
                      darkmode
                        ? "text-xl font-medium bg-gray-700 hover:bg-cyan-700 border-2 border-gray-600 w-32 rounded-lg rounded-base p-1 px-1 text-nowrap"
                        : "text-xl font-medium bg-white hover:bg-cyan-200 border-2 border-gray-600 w-32 rounded-lg rounded-base p-1 px-1 text-nowrap"
                    }
                  >
                    All
                  </button>
                  <button
                    onClick={sortWordsBTN}
                    className={
                      darkmode
                        ? "text-xl font-medium bg-gray-700 hover:bg-cyan-700 border-2 border-gray-600 w-32 rounded-lg rounded-base p-1 px-1 text-nowrap"
                        : "text-xl font-medium bg-white hover:bg-cyan-200 border-2 border-gray-600 w-32 rounded-lg rounded-base p-1 px-1 text-nowrap"
                    }
                  >
                    Description
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <form
          onSubmit={searchBlog}
          className="flex flex-row flex-nowrap border-2 bg-white text-black shadow-lg rounded-md items-center justify-center mx-auto h-10 font-medium text-lg"
        >
          <input
            type="search"
            name="searchText"
            placeholder="Search a Blog"
            className="h-full px-3 rounded-md"
          />
          <button className="h-full px-2 text-2xl text-black hover:text-cyan-700 transition">
            <FaSearchPlus />
          </button>
        </form>

        {dataLoading ? (
          <div className="flex items-center justify-center py-20">
            <DNA></DNA>
          </div>
        ) : (
          <div className="sm:mt-12 mt-5 grid container lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center items-center gap-5">
            {blogs.length > 0 ? (
              blogs.map((blog) => {
                return (
                  <div
                    data-aos="zoom-in"
                    key={blog._id}
                    className={
                      darkmode
                        ? "w-full flex flex-col items-center justify-center bg-gray-700 gap-2 p-3 rounded-lg border-2 border-gray-200 shadow-lg"
                        : "w-full flex flex-col items-center justify-center bg-white gap-2 p-3 rounded-lg border-2 border-gray-700 shadow-lg"
                    }
                  >
                    <div className="w-full">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-row gap-1 items-center">
                          <img
                            className="border-2 border-gray-500 h-10 w-10 rounded-full"
                            src={blog.userImage}
                          />
                          <h3 className="text-xl font-semibold">
                            {blog.userName}
                          </h3>
                        </div>
                        {user?.email === blog.userEmail && (
                          <button
                            onClick={() => handleDeleteBlog(blog._id)}
                            className="text-2xl text-red-700 transition hover:text-red-500"
                          >
                            <FaTrashAlt></FaTrashAlt>
                          </button>
                        )}
                      </div>
                    </div>
                    <PhotoProvider>
                      <PhotoView src={blog.image}>
                        <img
                          src={blog.image}
                          className={
                            darkmode
                              ? "object-cover rounded-lg w-full lg:h-48 md:h-40 sm:h-40 border-2 border-gray-400 shadow-gray-300 shadow-lg"
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
        )}
        <Tooltip id="my-tooltip" />
      </div>
    );
  }
};

export default Blogs;

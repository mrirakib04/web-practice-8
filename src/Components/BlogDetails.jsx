import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { PiNotePencilBold } from "react-icons/pi";
import { IoSend } from "react-icons/io5";
import { DNA } from "react-loader-spinner";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Skeleton from "react-loading-skeleton";
import { FaRegCommentDots } from "react-icons/fa";

const BlogDetails = () => {
  // context
  const { darkmode, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const params = useParams();
  const [blog, setBlog] = useState([]);
  const [comments, setComments] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const getCommentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    let hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day}-${month}-${year} ${hours}:${minutes}${ampm}`;
  };

  const commentDate = getCommentDateTime();

  const getBlog = async () => {
    axios
      .get(`https://mrirakib04-server-2.vercel.app/blog/${params.id}`, {
        withCredentials: true,
      })
      .then((res) => setBlog(res.data))
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

  const getComments = async () => {
    axios
      .get(`https://mrirakib04-server-2.vercel.app/comments/${params.id}`, {
        withCredentials: true,
      })
      .then((res) => setComments(res.data))
      .catch((error) => {
        toast.error(`Error loading comments: ${error}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

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
    const wishlistFor = user.email;

    if (
      wishlist.some(
        (blog) => blogId === blog.blogId && user.email === blog.wishlistFor
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

  // comments reading and posting
  const postComment = (e) => {
    e.preventDefault();
    if (!user) {
      return navigate("/login");
    }

    const comment = e.target.comment.value;
    const blogId = blog._id;
    const commentByName = user.displayName;
    const commentByImage = user.photoURL;
    const commentTime = commentDate;

    if (!comment) {
      return toast.warn(`You can't empty comment`, {
        position: "top-center",
        autoClose: 2000,
        closeButton: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    if (user.email === blog.userEmail) {
      return toast.warn(`You can't comment on your own blog`, {
        position: "top-center",
        autoClose: 2000,
        closeButton: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    const newComment = {
      comment,
      blogId,
      commentByName,
      commentByImage,
      commentTime,
    };

    axios
      .post("https://mrirakib04-server-2.vercel.app/comments", newComment, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success(`You have commented successfully 🤩`, {
            position: "top-center",
            autoClose: 2000,
            closeButton: true,
            pauseOnHover: true,
            draggable: true,
          });
          e.target.reset();
          setComments((prevComments) => [...prevComments, newComment]);
        }
      })
      .catch((error) => {
        toast.error(`Something went wrong. Try again ${error.message} 💔`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  useEffect(() => {
    getBlog();
  }, [params.id]);

  useEffect(() => {
    getComments();
  }, [params.id]);
  useEffect(() => {
    getWishlist();
  }, [params.id]);

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
            ? "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-tl bg-cyan-800 via-black from-purple-900 sm:py-20 py-12 sm:px-5 text-white"
            : "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-tl bg-cyan-200 via-white from-purple-200 sm:py-20 py-12 sm:px-5"
        }
      >
        <h2
          className={
            darkmode
              ? "md:text-5xl sm:text-3xl text-xl font-bold text-gray-200 flex items-center gap-2"
              : "md:text-5xl sm:text-3xl text-xl font-bold text-black flex items-center gap-2"
          }
        >
          Explore Blog
          <p
            className={
              darkmode
                ? "text-cyan-400 italic animate__animated animate__pulse animate__infinite animate__slow"
                : "text-cyan-700 italic animate__animated animate__pulse animate__infinite animate__slow"
            }
          >
            Details
          </p>
        </h2>

        <div className="container mx-auto">
          <div className="mt-5 md:w-1/2 flex flex-col gap-5 mx-auto border-2 border-gray-500 rounded-lg sm:w-2/3 w-full p-2 text-black bg-white">
            {/* blog details */}
            <div className="flex flex-col gap-2">
              {/* blog header */}
              <div className="w-full flex items-center md:flex-nowrap flex-wrap justify-between gap-2">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-14 h-14">
                    <PhotoProvider>
                      <PhotoView src={blog.userImage}>
                        <img
                          className="w-full h-full object-cover rounded-full border-2 border-cyan-600"
                          src={blog.userImage}
                          alt={blog.userName}
                        />
                      </PhotoView>
                    </PhotoProvider>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="sm:text-xl text-lg font-semibold">
                      {blog.userName}
                    </h2>
                    <a
                      className="text-sm font-medium text-gray-600"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={`Posted On: ${blog.publishDate}`}
                      data-tooltip-place="right"
                    >
                      {blog.publishDate}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:w-auto w-full md:justify-end justify-between">
                  <button
                    onClick={() =>
                      handleWishlist(
                        blog._id,
                        blog.blogName,
                        blog.category,
                        blog.userName
                      )
                    }
                    className="lg:py-2 py-1 lg:px-4 px-2 rounded-md bg-green-700 text-lg text-white font-semibold hover:bg-green-500 hover:shadow-md transition"
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
              {/* blog body */}
              <div className="w-full flex flex-col gap-1">
                <h3 className="text-lg font-semibold">Name: {blog.blogName}</h3>
                <p className="text-base font-medium text-gray-700">
                  Category: {blog.category}
                </p>
                <PhotoProvider>
                  <PhotoView src={blog.image}>
                    <img
                      className="mt-2 lg:h-72 md:h-60 sm:h-56 h-44 w-full object-cover rounded-md border-2 border-gray-400 shadow-lg shadow-gray-300"
                      src={blog.image}
                      alt={blog.blogName}
                    />
                  </PhotoView>
                </PhotoProvider>
                <p className="mt-3 text-lg font-medium text-gray-800">
                  <span className="font-bold text-black">Description: </span>
                  {blog.description}
                </p>
              </div>
            </div>

            <Skeleton
              baseColor="gray"
              className="h-1"
              highlightColor="lightgreen"
              duration={2}
            ></Skeleton>
            {/* comments */}
            <div className="flex flex-col gap-3 items-center">
              <form
                className="w-full flex items-center relative"
                onSubmit={postComment}
              >
                <textarea
                  className="w-full h-20 border-2 border-gray-400 rounded p-1 px-2"
                  name="comment"
                  placeholder="Comment on this post"
                ></textarea>
                <button className="p-2 absolute bottom-1 right-1 text-xl hover:text-sky-600 transition">
                  <IoSend></IoSend>
                </button>
              </form>
              <div className="w-full flex flex-col gap-2 items-center">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="w-full flex flex-col gap-1 border-2 rounded-lg p-2"
                    >
                      <div className="flex gap-1 items-center">
                        <PhotoProvider>
                          <PhotoView src={comment.commentByImage}>
                            <img
                              className="h-10 w-10 rounded-full object-cover border-2 border-gray-500"
                              src={comment.commentByImage}
                            />
                          </PhotoView>
                        </PhotoProvider>
                        <div className="flex flex-col">
                          <h3 className="text-base font-semibold flex items-center gap-1">
                            {comment.commentByName}
                            <FaRegCommentDots></FaRegCommentDots>
                          </h3>
                          <a
                            className="text-sm font-medium text-gray-600"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={`Commented On: ${comment.commentTime}`}
                            data-tooltip-place="right"
                          >
                            {comment.commentTime}
                          </a>
                        </div>
                      </div>
                      <p className="text-base font-medium text-gray-700">
                        {comment.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <h2 className="text-xl font-medium text-center mx-auto">
                    Opps! No comments here.
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default BlogDetails;

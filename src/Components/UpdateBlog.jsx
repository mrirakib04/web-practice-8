import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";

const UpdateBlog = () => {
  const { darkmode } = useContext(AuthContext);
  const [updateBlog, setUpdateBlog] = useState([]);
  const params = useParams();

  const getBlog = async () => {
    axios
      .get(`https://mrirakib04-server-2.vercel.app/update/blog/${params.id}`)
      .then((res) => setUpdateBlog(res.data || []))
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
    getBlog();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const blogName = e.target.blogName.value;
    const image = e.target.image.value;
    const description = e.target.description.value;
    const publishDate = e.target.publishDate.value;
    const category = e.target.category.value;
    const userName = e.target.userName.value;
    const userEmail = e.target.userEmail.value;
    const userImage = updateBlog.userImage;

    const newUpdate = {
      blogName,
      image,
      description,
      publishDate,
      category,
      userName,
      userEmail,
      userImage,
    };

    axios
      .put(
        `https://mrirakib04-server-2.vercel.app/update/blog/${updateBlog._id}`,
        newUpdate
      )
      .then((response) => {
        if (response.status == 200) {
          toast.success(`Your blog updated 🤩`, {
            position: "top-center",
            autoClose: 2000,
            closeButton: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
      .catch((error) => {
        toast.error(`Something wrong: ${error.message} 💔`, {
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
          ? "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-t bg-sky-950  from-red-950 sm:py-20 py-12 sm:px-5 text-black"
          : "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-t bg-sky-300  from-red-200 sm:py-20 py-12 sm:px-5"
      }
    >
      <h2
        className={
          darkmode
            ? "md:text-5xl sm:text-3xl text-xl font-bold text-white flex items-center gap-2"
            : "md:text-5xl sm:text-3xl text-xl font-bold text-black flex items-center gap-2"
        }
      >
        <p
          className={
            darkmode
              ? "text-teal-500 italic animate__animated animate__pulse animate__infinite animate__slow"
              : "text-red-950 italic animate__animated animate__pulse animate__infinite animate__slow"
          }
        >
          Update
        </p>
        Your Blog
      </h2>

      <div className="w-full mx-auto">
        <form
          onSubmit={handleUpdate}
          className={
            darkmode
              ? "w-full md:w-2/3 sm:w-3/4 mx-auto bg-gray-300 p-6 rounded-xl shadow-md mt-6"
              : "w-full md:w-2/3 sm:w-3/4 mx-auto bg-white p-6 rounded-xl shadow-md mt-6"
          }
        >
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <div className="mb-4">
              <label
                htmlFor="blogName"
                className="block text-lg font-medium text-gray-700"
              >
                Blog Name:
              </label>
              <input
                type="text"
                name="blogName"
                id="blogName"
                value={updateBlog.blogName || ""}
                onChange={(e) =>
                  setUpdateBlog((prev) => ({
                    ...prev,
                    blogName: e.target.value,
                  }))
                }
                required
                className="w-full p-2 border-2 border-zinc-400 rounded mt-2 text-base font-medium"
                placeholder="Enter blog title/name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-lg font-medium text-gray-700"
              >
                Blog Image URL:
              </label>
              <input
                type="url"
                name="image"
                id="image"
                value={updateBlog.image || "empty"}
                onChange={(e) =>
                  setUpdateBlog((prev) => ({
                    ...prev,
                    image: e.target.value,
                  }))
                }
                required
                className="w-full p-2 border-2 border-zinc-400 rounded mt-2 text-base font-medium"
                placeholder="Enter blog image URL"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              value={updateBlog.description || "empty"}
              onChange={(e) =>
                setUpdateBlog((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
              rows="4"
              className="w-full p-2 border-2 border-zinc-400 rounded mt-2 text-base font-medium"
              placeholder="Write your blog description here"
            ></textarea>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-lg font-medium text-gray-700"
              >
                Blog Category:
              </label>
              <select
                name="category"
                id="category"
                value={updateBlog.category || "Lifestyle"}
                onChange={(e) =>
                  setUpdateBlog((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                placeholder="Blog Category"
                className="w-full p-2 border-2 border-zinc-400 rounded mt-2 text-base font-medium"
              >
                <option
                  value="Lifestyle"
                  className="text-base text-gray-500 font-medium"
                >
                  Lifestyle
                </option>
                <option
                  value="Travel"
                  className="text-base text-gray-500 font-medium"
                >
                  Travel
                </option>
                <option
                  value="Technology"
                  className="text-base text-gray-500 font-medium"
                >
                  Technology
                </option>
                <option
                  value="Entertainment"
                  className="text-base text-gray-500 font-medium"
                >
                  Entertainment
                </option>
                <option
                  value="Gaming"
                  className="text-base text-gray-500 font-medium"
                >
                  Gaming
                </option>
                <option
                  value="Other"
                  className="text-base text-gray-500 font-medium"
                >
                  Other
                </option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="publishDate"
                className="block text-lg font-medium text-gray-700"
              >
                Posting Date:
              </label>
              <input
                type="text"
                name="publishDate"
                id="publishDate"
                value={updateBlog.publishDate || ""}
                readOnly
                className="w-full p-2 border-2 border-zinc-400 rounded mt-2 text-base font-medium"
                placeholder="Enter game publishing year"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-lg font-medium text-gray-700"
              >
                Your Name:
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={updateBlog.userName || ""}
                readOnly
                className="w-full p-2 border-2 border-zinc-400 rounded mt-2 text-base font-medium"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="userEmail"
                className="block text-lg font-medium text-gray-700"
              >
                Your Email:
              </label>
              <input
                type="email"
                name="userEmail"
                id="userEmail"
                value={updateBlog.userEmail || ""}
                readOnly
                className="w-full p-2 border-2 border-zinc-400 rounded mt-2 text-base font-medium"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 border-b-2 border-gray-50 text-white text-lg font-semibold py-2 px-6 rounded-lg hover:border-gray-300 hover:shadow-lg hover:bg-blue-600 transition"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>

      <div className="w-full pb-4 pt-8">
        <Skeleton
          baseColor="lightgray"
          className="h-3"
          highlightColor="teal"
          duration={2}
        ></Skeleton>
      </div>
      <h2
        className={
          darkmode
            ? "md:text-5xl sm:text-3xl text-xl font-bold text-white flex items-center gap-2"
            : "md:text-5xl sm:text-3xl text-xl font-bold text-black flex items-center gap-2"
        }
      >
        <p
          className={
            darkmode
              ? "text-teal-500 italic animate__animated animate__flash animate__infinite animate__slower"
              : "text-teal-900 italic animate__animated animate__flash animate__infinite animate__slower"
          }
        >
          Live
        </p>
        Display
      </h2>

      <div
        className={
          darkmode
            ? "w-full md:w-2/3 sm:w-3/4 mx-auto bg-gray-300 p-6 rounded-xl shadow-md mt-6"
            : "w-full md:w-2/3 sm:w-3/4 mx-auto bg-white p-6 rounded-xl shadow-md mt-6"
        }
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <img
            className="w-full sm:h-56 h-48 object-cover rounded-md border-2 border-gray-500 shadow-lg"
            src={updateBlog.image}
            alt={updateBlog.blogName}
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-black">
              {updateBlog.blogName}
            </h3>
            <div className="flex flex-col">
              <p className="text-base font-medium text-gray-800">
                Category: {updateBlog.category}
              </p>
              <p className="text-base font-medium text-gray-800">
                Posted Date: {updateBlog.publishDate}
              </p>
              <p className="text-base font-medium text-gray-800">
                PostedBy: {updateBlog.userName}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-3 text-lg font-medium text-gray-700">
          <span className="text-xl font-semibold text-black">Description:</span>{" "}
          {updateBlog.description}
        </p>
      </div>
    </div>
  );
};

export default UpdateBlog;

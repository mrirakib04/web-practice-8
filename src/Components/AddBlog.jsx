import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Contexts/AuthContextProvider";
import axios from "axios";

const AddBlog = () => {
  const { user, darkmode } = useContext(AuthContext);

  const getCurrentDateTime = () => {
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

  const currentDate = getCurrentDateTime();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogName = e.target.blogName.value;
    const image = e.target.image.value;
    const description = e.target.description.value;
    const publishDate = e.target.publishDate.value;
    const category = e.target.category.value;
    const userName = e.target.userName.value;
    const userEmail = e.target.userEmail.value;
    const userImage = user.photoURL;

    const newBlog = {
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
      .post("https://mrirakib04-server-2.vercel.app/blogs", newBlog, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success(`Your blog posted 🤩`, {
            position: "top-center",
            autoClose: 2000,
            closeButton: true,
            pauseOnHover: true,
            draggable: true,
          });
          e.target.reset();
        }
      })
      .catch((error) => {
        toast.error(`${error.message} 💔`, {
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
          ? "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-tr bg-purple-950 via-sky-900 from-red-950 sm:py-20 py-12 sm:px-5 text-black"
          : "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-tr bg-purple-300 via-sky-200 from-red-200 sm:py-20 py-12 sm:px-5"
      }
    >
      <h2
        className={
          darkmode
            ? "md:text-5xl sm:text-3xl text-xl font-bold text-white flex items-center gap-2"
            : "md:text-5xl sm:text-3xl text-xl font-bold text-black flex items-center gap-2"
        }
      >
        Post Your
        <p
          className={
            darkmode
              ? "text-teal-500 italic animate__animated animate__flash animate__infinite animate__slower"
              : "text-red-950 italic animate__animated animate__flash animate__infinite animate__slower"
          }
        >
          Blog
        </p>
      </h2>
      <p
        className={
          darkmode
            ? "md:w-2/3 md:text-xl sm:text-lg text-base font-medium text-gray-300 mt-2 text-center"
            : "md:w-2/3 md:text-xl sm:text-lg text-base font-medium text-gray-600 mt-2 text-center"
        }
      >
        Share your thoughts, ideas, or experiences with the world by publishing
        engaging and impactful blog posts.
      </p>
      <div className="w-full mx-auto">
        <form
          onSubmit={handleSubmit}
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
                required
                className="w-full p-2 border-2 border-zinc-400 rounded mt-2 text-base font-medium"
                placeholder="Enter game title/name"
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
                value={currentDate}
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
                value={user.displayName}
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
                value={user?.email}
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
              Post Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;

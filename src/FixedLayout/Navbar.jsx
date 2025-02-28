import { useContext, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import NavLogo from "./../../public/b-logo.jpg";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { BsSun, BsSunFill } from "react-icons/bs";

const Navbar = () => {
  const { user, image, handleLogout, darkmode, setDarkmode } =
    useContext(AuthContext);
  const [navShow, setNavShow] = useState(false);
  const navShowHide = () => setNavShow((prev) => !prev);
  const [showProfile, setShowProfile] = useState(false);
  const profileShowHide = () => setShowProfile((prev) => !prev);
  const activeDarkmode = () => setDarkmode((prev) => !prev);

  return (
    <div
      className={
        darkmode
          ? "bg-red-900/90 w-full max-w-[1480px] fixed z-40"
          : "bg-red-100/90 w-full max-w-[1480px] fixed z-40"
      }
    >
      <div className="text-black flex justify-between items-center py-4 md:px-6 sm:px-3 px-2 mx-auto">
        <div className="relative text-xl flex gap-3 font-bold items-center">
          <div className="flex">
            <button className="lg:hidden text-2xl" onClick={navShowHide}>
              <RiMenu2Fill />
            </button>
            {navShow && (
              <div className="absolute lg:hidden border-2 text-base rounded-lg top-14 font-bold bg-gray-100 text-gray-700 p-4">
                <ul className="flex flex-col gap-2 text-nowrap">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                        : "border-2 border-transparent py-2 px-4 rounded-lg"
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                        : "border-2 border-transparent py-2 px-4 rounded-lg"
                    }
                    to="/add-blog"
                  >
                    Add-Blog
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                        : "border-2 border-transparent py-2 px-4 rounded-lg"
                    }
                    to="/blogs"
                  >
                    Blogs
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                        : "border-2 border-transparent py-2 px-4 rounded-lg"
                    }
                    to="/featured-blogs"
                  >
                    Featured-Blogs
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                        : "border-2 border-transparent py-2 px-4 rounded-lg"
                    }
                    to="/wishlist"
                  >
                    Wishlist
                  </NavLink>
                </ul>
              </div>
            )}
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 shadow-lg sm:px-2 sm:py-2 sm:rounded-lg sm:bg-red-400"
          >
            <img
              src={NavLogo}
              className="sm:w-14 sm:h-14 w-12 h-12 rounded-md object-cover"
              alt="BlogEng BD logo"
            />
            <h2 className="sm:flex hidden text-xl font-bold">BlogEng BD</h2>
          </Link>
        </div>
        <div
          className={
            darkmode
              ? "lg:flex font-bold text-base hidden text-gray-200"
              : "lg:flex font-bold text-base hidden"
          }
        >
          <ul className="flex gap-1">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "py-1 bg-red-300 shadow-lg px-4 rounded-lg border-b-2 border-white text-black"
                  : "py-1 px-2 rounded-lg border-b-2 border-transparent"
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "py-1 bg-red-300 shadow-lg px-4 rounded-lg border-b-2 border-white text-black"
                  : "py-1 px-2 rounded-lg border-b-2 border-transparent"
              }
              to="/add-blog"
            >
              Add-Blog
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "py-1 bg-red-300 shadow-lg px-4 rounded-lg border-b-2 border-white text-black"
                  : "py-1 px-2 rounded-lg border-b-2 border-transparent"
              }
              to="/blogs"
            >
              Blogs
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "py-1 bg-red-300 shadow-lg px-4 rounded-lg border-b-2 border-white text-black"
                  : "py-1 px-2 rounded-lg border-b-2 border-transparent"
              }
              to="/featured-blogs"
            >
              Featured-Blogs
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "py-1 bg-red-300 shadow-lg px-4 rounded-lg border-b-2 border-white text-black"
                  : "py-1 px-2 rounded-lg border-b-2 border-transparent"
              }
              to="/wishlist"
            >
              Wishlist
            </NavLink>
          </ul>
        </div>
        {user ? (
          <div className="relative flex gap-2 items-center">
            <div>
              <button
                data-tooltip-id="my-tooltip"
                data-tooltip-content={darkmode ? "Light Mode" : "Dark Mode"}
                onClick={activeDarkmode}
                className={
                  darkmode
                    ? "p-1 rounded-full bg-white text-black font-bold text-3xl max-h-10 max-w-10 w-full h-full"
                    : "p-1 rounded-full bg-black text-white font-bold text-3xl max-h-10 max-w-10 w-full h-full"
                }
              >
                {darkmode ? <BsSun></BsSun> : <BsSunFill></BsSunFill>}
              </button>
            </div>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content={user.displayName}
            >
              <button onClick={profileShowHide}>
                <img
                  className="h-14 w-14 object-cover rounded-full border-2 border-cyan-500"
                  src={image}
                  alt="User-Photo"
                />
              </button>
            </a>
            {showProfile && (
              <div className="absolute top-16 right-2 flex flex-col gap-2 py-5 px-3 bg-gray-50 rounded-lg border-2">
                <h3 className="text-lg font-semibold">{user.displayName}</h3>
                <p className="text-lg text-gray-600 font-medium">
                  {user.email}
                </p>

                <div>
                  <button
                    onClick={handleLogout}
                    className="mt-3 text-xl text-left font-bold text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 text-black">
            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content={darkmode ? "Light Mode" : "Dark Mode"}
              onClick={activeDarkmode}
              className={
                darkmode
                  ? "p-1 rounded-full bg-white text-black font-bold text-3xl max-h-10 max-w-10 w-full h-full"
                  : "p-1 rounded-full bg-black text-white font-bold text-3xl max-h-10 max-w-10 w-full h-full"
              }
            >
              {darkmode ? <BsSun></BsSun> : <BsSunFill></BsSunFill>}
            </button>
            <Link
              to="/login"
              className="flex gap-2 items-center sm:px-5 p-1 bg-white rounded-full text-2xl border-2 border-cyan-500"
            >
              <p className="text-lg font-semibold sm:block hidden">Login</p>
              <FiLogIn></FiLogIn>
            </Link>
          </div>
        )}
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default Navbar;

import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";
import content1 from "./../assets/content-img/c1-lifestyle.jpg";
import content2 from "./../assets/content-img/c2-travel.jpg";
import content3 from "./../assets/content-img/c3-technology.jpg";
import content4 from "./../assets/content-img/c4-entertainment.jpg";
import content5 from "./../assets/content-img/c5-gaming.jpg";
import content6 from "./../assets/content-img/c6-other.jpg";
import Marquee from "react-fast-marquee";

const AdditionalSectionA = () => {
  const { darkmode } = useContext(AuthContext);

  return (
    <div
      className={
        darkmode
          ? "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-t bg-red-950 via-cyan-900 from-purple-950 sm:py-14 py-10 sm:px-5 text-black"
          : "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-t bg-red-300 via-cyan-200 from-purple-300 sm:py-14 py-10 sm:px-5"
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
              ? "text-emerald-400  animate__animated animate__pulse animate__infinite animate__slow"
              : "text-red-950 italic animate__animated animate__pulse animate__infinite animate__slow"
          }
        >
          Contents
        </p>
        You Will Get
      </h2>
      <p
        className={
          darkmode
            ? "md:w-2/3 md:text-xl sm:text-lg text-base font-medium text-gray-400 mt-2 text-center"
            : "md:w-2/3 md:text-xl sm:text-lg text-base font-medium text-gray-600 mt-2 text-center"
        }
      >
        Browse diverse blog categories, from lifestyle to technology, and
        explore topics tailored to your interests.
      </p>
      <div className="mt-5 md:w-4/5 w-full mx-auto p-1 rounded-lg h-72 flex flex-col justify-center gap-5">
        <Marquee
          gradient
          gradientWidth={50}
          pauseOnHover
          direction="right"
          gradientColor={darkmode ? "gray" : "white"}
        >
          <div
            className={
              darkmode
                ? "flex  flex-col items-center justify-center bg-gray-500 gap-2 p-3 rounded-lg border-2 border-red-600 shadow-lg ml-5"
                : "flex  flex-col items-center justify-center bg-red-50 gap-2 p-3 rounded-lg border-2 border-red-800 shadow-lg ml-5"
            }
          >
            <img
              className="h-36 rounded-md w-full"
              src={content1}
              alt="Lifestyle"
            />
            <h3 className="text-xl sm:text-2xl font-medium ">Lifestyle</h3>
          </div>
          <div
            className={
              darkmode
                ? "flex flex-col items-center justify-center bg-gray-500 gap-2 p-3 rounded-lg border-2 border-red-600 shadow-lg ml-5"
                : "flex flex-col items-center justify-center bg-red-50 gap-2 p-3 rounded-lg border-2 border-red-800 shadow-lg ml-5"
            }
          >
            <img
              className="h-36 rounded-md w-full"
              src={content2}
              alt="Travel"
            />
            <h3 className="text-xl sm:text-2xl font-medium">Travel</h3>
          </div>
          <div
            className={
              darkmode
                ? "flex flex-col items-center justify-center bg-gray-500 gap-2 p-3 rounded-lg border-2 border-red-600 shadow-lg ml-5"
                : "flex flex-col items-center justify-center bg-red-50 gap-2 p-3 rounded-lg border-2 border-red-800 shadow-lg ml-5"
            }
          >
            <img
              className="h-36 rounded-md w-full"
              src={content3}
              alt="Technology"
            />
            <h3 className="text-xl sm:text-2xl font-medium ">Technology</h3>
          </div>
          <div
            className={
              darkmode
                ? "flex flex-col items-center justify-center bg-gray-500 gap-2 p-3 rounded-lg border-2 border-red-600 shadow-lg ml-5"
                : "flex flex-col items-center justify-center bg-red-50 gap-2 p-3 rounded-lg border-2 border-red-800 shadow-lg ml-5"
            }
          >
            <img
              className="h-36 rounded-md w-full"
              src={content4}
              alt="Entertainment"
            />
            <h3 className="text-xl sm:text-2xl font-medium ">Entertainment</h3>
          </div>
          <div
            className={
              darkmode
                ? "flex flex-col items-center justify-center bg-gray-500 gap-2 p-3 rounded-lg border-2 border-red-600 shadow-lg ml-5"
                : "flex flex-col items-center justify-center bg-red-50 gap-2 p-3 rounded-lg border-2 border-red-800 shadow-lg ml-5"
            }
          >
            <img
              className="h-36 rounded-md w-full"
              src={content5}
              alt="Gaming"
            />
            <h3 className="text-xl sm:text-2xl font-medium ">Gaming</h3>
          </div>
          <div
            className={
              darkmode
                ? "flex flex-col items-center justify-center bg-gray-500 gap-2 p-3 rounded-lg border-2 border-red-600 shadow-lg ml-5"
                : "flex flex-col items-center justify-center bg-red-50 gap-2 p-3 rounded-lg border-2 border-red-800 shadow-lg ml-5"
            }
          >
            <img
              className="h-36 rounded-md w-full"
              src={content6}
              alt="Others"
            />
            <h3 className="text-xl sm:text-2xl font-medium">Others</h3>
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default AdditionalSectionA;

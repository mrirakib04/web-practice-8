import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { motion } from "framer-motion";
import logo1 from "./../../public/b-logo.jpg";
import logo2 from "./../../public/logo-with-bg.jpg";

const Banner = () => {
  const { darkmode } = useContext(AuthContext);

  // Animation Variants
  const bannerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { yoyo: Infinity, duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial="visible"
      animate="visible"
      variants={bannerVariants}
      className={`w-full flex flex-col items-center justify-center text-center ${
        darkmode
          ? "bg-gradient-to-t from-purple-950 via-black to-purple-950 text-white"
          : "bg-gradient-to-t from-purple-300 via-white to-purple-300 text-black"
      } py-20 px-5`}
    >
      <div className="flex items-center gap-5 flex-wrap-reverse justify-evenly">
        <div className="flex flex-col">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4"
          >
            Welcome to BlogEng BD
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="text-lg sm:text-2xl mb-8 lg:max-w-xl"
          >
            Dive into the world of creativity and insights with our curated
            posts. Stay informed, inspired, and connected!
          </motion.p>
          <div>
            <motion.a
              whileHover="hover"
              href="#latest-blogs"
              variants={buttonVariants}
              className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-300"
            >
              Explore Blogs
            </motion.a>
          </div>
        </div>
        <div className="flex flex-col sm:w-auto w-full">
          <motion.img
            animate={{ x: [5, 15, 5], y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-32 h-32 rounded-tr-xl rounded-bl-xl border-l-4 border-t-4 border-cyan-600"
            src={logo1}
            alt="logo-1"
          />
          <motion.img
            animate={{ y: [-5, -20, -5], x: [105, 110, 105] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-32 h-32 rounded-tr-xl rounded-bl-xl border-l-4 border-t-4 border-cyan-600"
            src={logo2}
            alt="logo-2"
          />
        </div>
      </div>
      <div id="latest-blogs"></div>
    </motion.div>
  );
};

export default Banner;

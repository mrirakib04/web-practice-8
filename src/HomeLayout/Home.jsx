import AdditionalSectionA from "./AdditionalSectionA";
import AdditionalSectionB from "./AdditionalSectionB";
import Banner from "./Banner";
import LatestBlogs from "./LatestBlogs";
import Newsletter from "./Newsletter";
import { motion, useScroll, useSpring } from "framer-motion";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX,
        }}
        className="fixed top-0 left-0 right-0 h-2 origin-left bg-black z-50"
      />
      <Banner></Banner>
      <LatestBlogs></LatestBlogs>
      <Newsletter></Newsletter>
      <AdditionalSectionA></AdditionalSectionA>
      <AdditionalSectionB></AdditionalSectionB>
    </div>
  );
};

export default Home;

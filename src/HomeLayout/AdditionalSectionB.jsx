import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";
import Faq from "react-faq-component";

const AdditionalSectionB = () => {
  const { darkmode } = useContext(AuthContext);

  const data = {
    rows: [
      {
        title: <p className="px-3">What is this blog about?</p>,
        content: `This blog covers a wide range of topics, from lifestyle, travel, technology and other and personal development.`,
      },
      {
        title: <p className="px-3">Can I comment on blog posts?</p>,
        content:
          "Yes, we encourage comments and feedback on all blog posts. Share your thoughts and engage with others!",
      },
      {
        title: <p className="px-3">Is the content free to access?</p>,
        content: `Yes, all content on our blog is free to read and enjoy. `,
      },
      {
        title: <p className="px-3">Do you have a mobile app for the blog?</p>,
        content: `Currently, we do not have an app, but our platform is mobile-friendly and easy to navigate on any device.`,
      },
    ],
  };

  const styles = {
    bgColor: "white",
    rowTitleColor: "black",
    rowContentColor: "#4b5563",
    rowContentPaddingLeft: "10px",
    rowContentPaddingRight: "10px",
  };

  const config = {
    animate: true,
    tabFocus: true,
  };
  return (
    <div
      className={
        darkmode
          ? "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-t bg-purple-950 via-gray-600 from-cyan-900 sm:py-10 py-10 sm:px-5 text-black"
          : "w-full p-2 flex flex-col items-center  gap-1 bg-gradient-to-t bg-purple-300 via-white from-cyan-300 sm:py-10 py-10 sm:px-5"
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
              ? "text-emerald-300 italic animate__animated animate__pulse animate__infinite animate__slower"
              : "text-cyan-950 italic animate__animated animate__pulse animate__infinite animate__slower"
          }
        >
          Frequently Asked Questions
        </p>
      </h2>

      <div className="mt-5 text-lg font-semibold md:w-4/5 w-full mx-auto p-1 rounded-lg flex flex-col justify-center">
        <Faq data={data} styles={styles} config={config} />
      </div>
    </div>
  );
};

export default AdditionalSectionB;

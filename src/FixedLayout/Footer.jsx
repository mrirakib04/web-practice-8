import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="w-full py-10 px-3 bg-black">
      <div className="mx-auto container flex gap-5 justify-between flex-wrap">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold text-white">Connect With Us</h3>
          <ul className="flex flex-col gap-1 font-medium text-gray-400 text-lg">
            <a href="https://www.facebook.com/" target="_blank">
              Facebook
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              Instagram
            </a>
            <a href="https://x.com/" target="_blank">
              Twitter
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              Youtube
            </a>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold text-white">Quick Links</h3>
          <ul className="flex flex-col gap-1 font-medium text-gray-400 text-lg">
            <Link to="/career">Career</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/details">Details</Link>
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-72">
          <h3 className="text-2xl font-semibold text-white">About Us</h3>
          <p className=" font-medium text-gray-400 text-lg">
            We provide a seamless platform for blogging, allowing users to
            create, manage, and share their unique stories effortlessly.
          </p>
        </div>
      </div>
      <div className="my-10 border border-gray-600"></div>
      <p className="text-center font-medium text-base text-white">
        &copy; 2024 BlogEng BD. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

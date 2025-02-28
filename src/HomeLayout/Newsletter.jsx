import { FcAddressBook } from "react-icons/fc";
import newsletterBG from "./../assets/newsletter-bg.jpg";
import newsletter from "./../assets/newsletter.gif";
import { toast } from "react-toastify";

const Newsletter = () => {
  return (
    <div
      className="w-full flex items-center py-20 px-3"
      style={{
        backgroundImage: `url(${newsletterBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto rounded-lg p-5 lg:w-2/3 md:w-5/6 sm:w-11/12 w-full border-2 border-white backdrop-blur-sm">
        <div className="w-full sm:border-2 sm:bg-white sm:bg-opacity-30 flex sm:flex-nowrap flex-wrap md:justify-around gap-2 sm:p-5 rounded-md">
          <div>
            <img
              className="lg:w-72 md:w-64 w-60 rounded-md"
              src={newsletter}
              alt="Newsletter-Gif"
            />
          </div>
          <div className="flex flex-col justify-evenly">
            <div className="flex flex-col gap-2">
              <h2 className="md:text-4xl text-2xl text-black font-bold">
                Subscribe Our NewsLetter
              </h2>
              <p className="sm:text-xl text-lg font-medium text-gray-700">
                Subscribe to our newsletter for updates, news, and exclusive
                offers!
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success(`Thank you for subscribing to our newsletter`, {
                  position: "top-right",
                  autoClose: 2000,
                  closeButton: true,
                  pauseOnHover: true,
                  draggable: true,
                });
                e.target.email.value = "";
              }}
              className="mt-5 w-full sm:flex-nowrap flex-wrap flex sm:bg-white sm:shadow-lg sm:shadow-gray-600 rounded-lg sm:border-b-2 sm:border-gray-500 items-center gap-1"
            >
              <div className="flex items-center bg-white rounded-md w-full">
                <label htmlFor="email" className="text-3xl p-2">
                  <FcAddressBook></FcAddressBook>
                </label>
                <input
                  className="w-full p-2 text-lg font-medium rounded-md"
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Your Email"
                />
              </div>
              <button className="bg-gradient-to-tr from-cyan-300 via-purple-300 to-emerald-300  text-lg font-bold h-12 px-3 sm:rounded-s-none sm:rounded-e-lg rounded-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

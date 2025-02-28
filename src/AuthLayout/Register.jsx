import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { Link, useNavigate } from "react-router";
import { useLocation } from "react-router";

const Register = () => {
  const { handleRegisterEmailPassword, handleGoogle, darkmode } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  // Password validation function
  const validatePassword = (password) => {
    // Example: Password must be at least 6 characters, contain a number, an uppercase letter, and a special character
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;

    if (!validatePassword(password)) {
      toast.error(
        "Please add at least 6 characters, a Number, an Uppercase & a Lowercase letter, a special character in password.",
        {
          position: "top-right",
          autoClose: 4000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      return;
    }

    handleRegisterEmailPassword(email, password, name, photoURL).then(() => {
      navigate(from, { replace: true });
    });
  };
  const handleGoogleLogin = () => {
    handleGoogle().then(() => {
      navigate(from, { replace: true });
    });
  };

  //   Dynamic Password Eye
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full px-4">
      <div
        className={
          darkmode
            ? "py-5 px-4 bg-gradient-to-tr bg-purple-900 via-cyan-700 from-pink-900 flex flex-col gap-5 border-4 border-cyan-300 rounded-xl lg:w-1/3 md:w-1/2 sm:w-2/3 mx-auto my-10 text-black font-medium"
            : "py-5 px-4 bg-gradient-to-tr bg-purple-300 via-cyan-100 from-pink-200 flex flex-col gap-5 border-4 border-cyan-300 rounded-xl lg:w-1/3 md:w-1/2 sm:w-2/3 mx-auto my-10 font-medium"
        }
      >
        <h3 className="text-3xl font-bold text-left">Register with:</h3>
        <button
          onClick={handleGoogleLogin}
          className={
            darkmode
              ? "border-2 border-cyan-300 bg-gray-600 rounded-lg text-xl font-semibold py-2 flex items-center justify-center gap-2"
              : "border-2 border-cyan-500 bg-white rounded-lg text-xl font-semibold py-2 flex items-center justify-center gap-2"
          }
        >
          <FcGoogle className="text-2xl" />
          Google
        </button>
        <p className="text-xl font-semibold text-center">or</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            name="name"
            className="border shadow-lg placeholder:text-lg placeholder:font-semibold py-3 rounded-lg px-3"
            type="text"
            placeholder="Name"
            required
          />
          <input
            name="photoURL"
            className="border shadow-lg placeholder:text-lg placeholder:font-semibold py-3 rounded-lg px-3"
            type="text"
            placeholder="Photo URL"
            required
          />
          <input
            name="email"
            className="border shadow-lg placeholder:text-lg placeholder:font-semibold py-3 rounded-lg px-3"
            type="email"
            placeholder="Email"
            required
          />
          <div className="relative">
            <input
              name="password"
              className="w-full border shadow-lg placeholder:text-lg placeholder:font-semibold py-3 rounded-lg px-3"
              type={!showPassword ? "password" : "text"}
              placeholder="Password"
              required
            />
            {!showPassword ? (
              <IoMdEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-2xl"
              ></IoMdEye>
            ) : (
              <IoMdEyeOff
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-2xl"
              ></IoMdEyeOff>
            )}
          </div>
          <button className="py-2 text-xl rounded-lg border-b-2 border-gray-300 text-black hover:shadow-lg shadow-md font-bold bg-gradient-to-tr bg-purple-400 via-gray-200 hover:via-white transition-[2000] from-sky-400">
            Register
          </button>
        </form>
        <p className="sm:text-lg text-base font-medium">
          Already have an account:&nbsp;
          <Link
            className="font-bold text-xl hover:text-cyan-600 transition"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

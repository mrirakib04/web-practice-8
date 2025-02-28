import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { Link, useLocation, useNavigate } from "react-router";

const Login = () => {
  const { handleLoginEmailPassword, handleGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    handleLoginEmailPassword(email, password).then(() => {
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
      <div className="py-5 px-4 flex flex-col gap-5 border-4 border-cyan-300 bg-white text-black rounded-xl lg:w-1/3 md:w-1/2 sm:w-2/3 mx-auto my-10 font-medium">
        <h3 className="text-3xl font-bold text-left">Login with:</h3>
        <button
          onClick={handleGoogleLogin}
          className="border-2 border-cyan-500 bg-white rounded-lg text-xl font-semibold py-2 flex items-center justify-center gap-2 text-black"
        >
          <FcGoogle className="text-2xl"></FcGoogle>
          Google
        </button>
        <p className="text-xl font-semibold text-center">or</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
          <input
            name="email"
            className="border shadow-md shadow-gray-400 placeholder:text-lg placeholder:font-semibold py-3 rounded-lg px-3"
            type="email"
            placeholder="Email"
            required
          />
          <div className="relative">
            <input
              name="password"
              className="w-full border shadow-md shadow-gray-400 placeholder:text-lg placeholder:font-semibold py-3 rounded-lg px-3"
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

          <button className="py-2 text-xl rounded-lg border-2 text-black shadow-md shadow-gray-400 font-bold bg-gradient-to-tr bg-purple-400 via-cyan-300 from-pink-400">
            Login
          </button>
        </form>
        <p className="sm:text-lg text-base font-medium">
          Don&apos;t have an account?&nbsp;
          <Link
            className="font-bold text-xl hover:text-green-700 transition"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

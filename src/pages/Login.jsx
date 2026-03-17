import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/slice/userSlice";
import { theme, tailwindClasses } from "../config/theme";
import { GiLeafSwirl } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiShoppingCart2Line } from "react-icons/ri";
import { fetchCartItems } from "../store/slice/cartProductSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isFormValid = () => {
    return isValidEmail(data.email) && data.password.length >= 3;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please enter valid credentials");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.login,
        data: data,
      });

      if (response.data?.error) {
        toast.error(response.data.message);
      }

      if (response.data?.success) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.data.accessToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setData({
          email: "",
          password: "",
        });
        dispatch(fetchCartItems());
        navigate("/");
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full container mx-auto px-2 min-h-[80vh] flex items-center justify-center relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-green-100/20 animate-spin-slow">
          <GiLeafSwirl size={100} />
        </div>
        <div className="absolute bottom-10 right-10 text-green-100/20 animate-bounce">
          <GiLeafSwirl size={120} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-50/10 text-9xl">
          <GiLeafSwirl size={200} />
        </div>
      </div>

      <div
        className="bg-white/90 backdrop-blur-sm my-4 w-full max-w-md mx-auto rounded-2xl
       shadow-2xl border border-green-100 p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br
           from-green-500 to-lime-500 rounded-2xl mb-4 shadow-lg"
          >
            <RiShoppingCart2Line size={32} className="text-white" />
          </div>
          <h2
            className={`text-2xl font-bold ${theme.colors.solid.sectionTitle}`}
          >
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Please enter your details to login
          </p>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              <MdEmail className="text-green-500" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`w-full p-3 pl-4 border rounded-xl outline-none transition-all bg-gray-50/50
                ${
                  data.email && !isValidEmail(data.email)
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                }
              `}
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {data.email && !isValidEmail(data.email) && (
              <p className="text-xs text-red-500 mt-1">
                Please enter a valid email
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              <RiLockPasswordLine className="text-green-500" />
              Password
            </label>
            <div
              className={`w-full p-3 border rounded-xl flex items-center transition-all bg-gray-50/50
              ${
                data.password && data.password.length < 3
                  ? "border-red-300 focus-within:border-red-500"
                  : "border-gray-200 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500"
              }
            `}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full outline-none bg-transparent"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer text-gray-500 hover:text-green-600 transition-colors"
              >
                {showPassword ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaRegEyeSlash size={18} />
                )}
              </button>
            </div>
            {data.password && data.password.length < 3 && (
              <p className="text-xs text-red-500 mt-1">
                Password must be at least 3 characters
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Link
              className="text-xs text-gray-500 hover:text-green-600 transition-colors"
              to={"/forgot-password"}
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={!isFormValid() || loading}
            className={`${tailwindClasses.button.primary} w-full py-3 mt-2 disabled:opacity-50 
            disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-green-100">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className={`font-semibold ${theme.colors.solid.sectionTitle} hover:text-green-700 transition-colors`}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

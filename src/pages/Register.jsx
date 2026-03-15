import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { theme, tailwindClasses } from "../config/theme";
import { GiLeafSwirl } from "react-icons/gi";
import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiShoppingCart2Line } from "react-icons/ri";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation functions
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isPasswordStrong = (password) => {
    return (
      password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
    );
  };

  const isFormValid = () => {
    return (
      data.name.length >= 3 &&
      isValidEmail(data.email) &&
      data.password.length >= 8 &&
      data.confirmPassword.length >= 8 &&
      data.password === data.confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password must be the same");
      return;
    }

    if (!isPasswordStrong(data.password)) {
      toast.error(
        "Password must be at least 8 characters with 1 uppercase and 1 number",
      );
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.register,
        data: data,
      });

      if (response.data?.error) {
        toast.error(response.data.message);
      }

      if (response.data?.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full container mx-auto px-2 min-h-screen flex items-center justify-center relative py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-green-100/30 animate-bounce">
          <GiLeafSwirl size={80} />
        </div>
        <div className="absolute bottom-20 right-10 text-green-100/30 animate-pulse">
          <GiLeafSwirl size={100} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-50/10 text-9xl">
          <GiLeafSwirl size={250} />
        </div>
      </div>

      <div
        className="bg-white/90 backdrop-blur-sm my-4 w-full max-w-lg mx-auto rounded-2xl shadow-2xl border
       border-green-100 p-8 relative z-10"
      >
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br
           from-green-500 to-lime-500 rounded-2xl mb-4 shadow-lg"
          >
            <RiShoppingCart2Line size={32} className="text-white" />
          </div>
          <h2
            className={`text-2xl font-bold ${theme.colors.solid.sectionTitle}`}
          >
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Join us and start shopping fresh groceries
          </p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              <MdPerson className="text-green-500" />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              autoFocus
              className={`w-full p-3 border rounded-xl outline-none transition-all bg-gray-50/50
                ${
                  data.name && data.name.length < 3
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                }
              `}
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {data.name && data.name.length < 3 && (
              <p className="text-xs text-red-500 mt-1">
                Name must be at least 3 characters
              </p>
            )}
          </div>

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
              className={`w-full p-3 border rounded-xl outline-none transition-all bg-gray-50/50
                ${
                  data.email && !isValidEmail(data.email)
                    ? "border-red-300 focus:border-red-500"
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
                data.password && data.password.length < 8
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

            {data.password && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      data.password.length >= 8 ? "bg-green-500" : "bg-gray-200"
                    }`}
                  ></div>
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      /[A-Z]/.test(data.password)
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  ></div>
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      /[0-9]/.test(data.password)
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  Password must be 8+ chars with 1 uppercase & 1 number
                </p>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              <RiLockPasswordLine className="text-green-500" />
              Confirm Password
            </label>
            <div
              className={`w-full p-3 border rounded-xl flex items-center transition-all bg-gray-50/50
              ${
                data.confirmPassword && data.password !== data.confirmPassword
                  ? "border-red-300 focus-within:border-red-500"
                  : "border-gray-200 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500"
              }
            `}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full outline-none bg-transparent"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer text-gray-500 hover:text-green-600 transition-colors"
              >
                {showConfirmPassword ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaRegEyeSlash size={18} />
                )}
              </button>
            </div>
            {data.confirmPassword && data.password !== data.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid() || loading}
            className={`${tailwindClasses.button.primary} w-full py-3 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-green-100">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className={`font-semibold ${theme.colors.solid.sectionTitle} hover:text-green-700 transition-colors`}
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;

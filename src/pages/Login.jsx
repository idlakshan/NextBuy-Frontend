import React, { useState } from "react";
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

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...summaryApi.login,
        data: data,
      });

      //  console.log(response);

      if (response.data?.error) {
        toast.error(response.data.message);
      }

      if (response.data?.success) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.data.accessToken);
       // localStorage.setItem("refreshToken", response.data.data.refreshToken);

       const userDetails = await fetchUserDetails();
       dispatch(setUserDetails(userDetails.data))

        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 p-2 border rounded outline-none focus:border-primary-200"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>
            <div className="bg-gray-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full outline-none"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link
              className="block ml-auto hover:text-[#009432]"
              to={"/forgot-password"}
            >
              Forgot password ?
            </Link>
          </div>

          <button
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-[#A3CB38] hover:bg-[#009432]" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Login
          </button>
        </form>

        <p>
          Don't have account ?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-[#A3CB38]  hover:text-[#009432] "
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

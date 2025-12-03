import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location =useLocation();

  //console.log(location);

  useEffect(()=>{
    if(!location?.state?.email){
      //console.log("hii");
      navigate("/forgot-password")
    }
  },[])
  
  const valideValue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...summaryApi.frogot_password_verification,
        data: {
          email:location.state?.email,
          otp:data.join("")
        },
      });

      if (response.data?.error) {
        toast.error(response.data.message);
      }

      if (response.data?.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
         navigate("/reset-password", {
          state:{
            data:response.data,
            email:location.state?.email
          }
         })
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-lg font-semibold">Enter OTP</p>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp">Enter Your OTP :</label>
            <div className="flex items-center gap-2 justify-between mt-3">
              {data.map((el, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    id="otp"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                     // console.log(value);
                      const newData = [...data];
                      newData[index] = value;

                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    maxLength={1}
                    className="bg-gray-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-[#A3CB38] hover:bg-[#009432]" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Verify OTP
          </button>
        </form>

        <p>
          Already have account ?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-[#A3CB38]  hover:text-[#009432] "
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;

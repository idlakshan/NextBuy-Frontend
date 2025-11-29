import React from "react";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";

const Header = () => {
  const [isMobile] = useMobile();
  const locaion = useLocation();

  const isSearchPage = locaion.pathname === "/search";
  const navigate = useNavigate()

   const redirectToLoginPage = ()=>{
        navigate("/login")
    }

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-6 justify-between">
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={70}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={50}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>
          <div className="hidden lg:block">
            <Search />
          </div>

          <div>
            <button className="text-neutral-600 lg:hidden">
              <FaRegCircleUser size={26} />
            </button>
            <div className="hidden lg:flex items-center gap-10">
              <button className='text-lg px-2' onClick={redirectToLoginPage}>Login</button>
              <button className="flex items-center gap-2 bg-[#A3CB38] p-3 hover:bg-[#009432] rounded text-white">
                <div className="animate-bounce">
                  <BsCart4 size={26}/>
                </div>
                <div>
                  <p className="font-semibold">my Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;

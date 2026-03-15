import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsBasket } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { GiLeafSwirl } from "react-icons/gi";
import { TbLeaf } from "react-icons/tb";
import { theme, tailwindClasses } from "../config/theme";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

  const cartItems = useSelector((state) => state?.cart?.items) || [];
  const cartCount = cartItems.length;

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user?._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <header className="h-24 lg:h-20 sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white/95 backdrop-blur-xs border-b border-green-100 shadow-xs">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-4 lg:px-6 justify-between">
          <div className="h-full">
            <Link
              to={"/"}
              className="h-full flex justify-center items-center group"
            >
              <img
                src={logo}
                width={70}
                height={60}
                alt="Fresh Grocery"
                className="hidden lg:block transition-transform duration-300 group-hover:scale-105"
              />
              <img
                src={logo}
                width={50}
                height={60}
                alt="Fresh Grocery"
                className="lg:hidden transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          <div className="hidden lg:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search />
              <div
                className={`absolute -top-2 -right-2 ${tailwindClasses.badge.fresh} text-[10px] px-2 py-0.5`}
              >
                Fresh
              </div>
            </div>
          </div>

          <div>
            <button
              className="text-green-600 lg:hidden hover:text-green-700 transition-colors"
              onClick={handleMobileUser}
            >
              <FaRegCircleUser size={26} />
            </button>
            <div className="hidden lg:flex items-center gap-6">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex items-center gap-1 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 bg-linear-to-r ${theme.colors.gradient.primary} rounded-full flex items-center justify-center text-white`}
                      >
                        <FaRegCircleUser size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Welcome</p>
                        <p className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors flex items-center gap-1">
                          {user?.name?.split(" ")[0] || "Account"}
                          {openUserMenu ? (
                            <GoTriangleUp
                              size={16}
                              className="text-green-500"
                            />
                          ) : (
                            <GoTriangleDown
                              size={16}
                              className="text-green-500"
                            />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {openUserMenu && (
                    <div className="absolute right-0 top-14">
                      <div className="bg-white rounded-xl p-2 min-w-56 shadow-xl border border-green-100">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-50 transition-colors">
                    <FaRegCircleUser
                      size={16}
                      className="group-hover:text-green-500"
                    />
                  </div>
                  <span className="font-medium">Login</span>
                </button>
              )}

              <button
                onClick={handleCartClick}
                className={`relative flex items-center gap-3 ${tailwindClasses.button.primary} p-2 pr-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
              >
                <div className="relative">
                  <div
                    className={`absolute -inset-1 bg-white/20 rounded-full ${theme.animations.ping} opacity-0 group-hover:opacity-100`}
                  ></div>
                  <BsBasket size={22} className="relative z-10" />
                </div>

                <div className="text-left">
                  <p className="text-[10px] leading-tight opacity-90">Fresh</p>
                  <p className="font-semibold text-sm leading-tight">My Cart</p>
                </div>

                {cartCount > 0 && (
                  <div
                    className={`absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${theme.animations.bounce}`}
                  >
                    {cartCount}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 lg:hidden">
        <div className="relative">
          <Search />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <GiLeafSwirl size={16} className="text-green-400" />
          </div>
        </div>
      </div>

      {isMobile && (
        <div className="fixed bottom-4 right-4 z-50 lg:hidden">
          <button
            onClick={handleCartClick}
            className={`relative ${tailwindClasses.button.floating}`}
          >
            <BsBasket size={24} className="text-white" />
            {cartCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${theme.animations.bounce}`}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

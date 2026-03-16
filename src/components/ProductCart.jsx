import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { theme, tailwindClasses } from "../config/theme";

const ProductCart = ({ data, className = "" }) => {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemsDetails] = useState();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.addto_cart, // Make sure this matches your API
        data: {
          productId: data?._id,
          quantity: 1,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(
          <div className="flex flex-col">
            <span>Added to cart!</span>
            <span className={`text-sm ${theme.colors.solid.sectionTitleLight}`}>
              {data.name}
            </span>
          </div>,
          { duration: 2000 },
        );
        if (fetchCartItem) {
          await fetchCartItem();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Check if this item is in cart or not
  useEffect(() => {
    if (cartItem && cartItem.length > 0) {
      const checkingitem = cartItem.some(
        (item) => item.productId?._id === data._id,
      );
      setIsAvailableCart(checkingitem);

      const product = cartItem.find((item) => item.productId?._id === data._id);
      setQty(product?.quantity || 0);
      setCartItemsDetails(product);
    } else {
      setIsAvailableCart(false);
      setQty(0);
      setCartItemsDetails(null);
    }
  }, [data, cartItem]);

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItemDetails?._id) return;

    try {
      await updateCartItem(cartItemDetails?._id, qty + 1);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const decreaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItemDetails?._id) return;

    try {
      if (qty === 1) {
        await deleteCartItem(cartItemDetails?._id);
        toast.success("Item removed from cart", { duration: 1000 });
      } else {
        await updateCartItem(cartItemDetails?._id, qty - 1);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  if (data?.stock === 0) {
    return (
      <span className="text-[10px] text-red-500 bg-red-50 px-3 py-1.5 rounded-full font-medium">
        Out of Stock
      </span>
    );
  }

  return (
    <div className={`${className}`}>
      {isAvailableCart ? (
        <div className="flex items-center justify-center bg-green-50 rounded-full border border-green-200 p-0.5">
          <button
            onClick={decreaseQty}
            className="w-7 h-7 rounded-full bg-white text-green-600 hover:bg-green-100 hover:text-green-700 flex items-center justify-center transition-all duration-200 shadow-sm"
          >
            <FaMinus size={10} />
          </button>

          <span className="w-7 text-center text-sm font-medium text-green-700">
            {qty}
          </span>

          <button
            onClick={increaseQty}
            disabled={qty >= data?.stock}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm
                            ${
                              qty >= data?.stock
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-green-600 hover:bg-green-100 hover:text-green-700"
                            }`}
          >
            <FaPlus size={10} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className={`${tailwindClasses.button.primary} !px-4 !py-1.5 text-sm whitespace-nowrap`}
        >
          {loading ? (
            <span className="flex items-center gap-1">
              <svg
                className={`animate-spin h-3 w-3 ${theme.animations.ping}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding...
            </span>
          ) : (
            "Add"
          )}
        </button>
      )}
    </div>
  );
};

export default ProductCart;

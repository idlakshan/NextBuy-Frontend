import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { tailwindClasses } from "../config/theme";
import {
  updateCartItemQty,
  deleteCartItem,
  addToCart,
} from "../store/slice/cartProductSlice";

const AddToCartButton = ({ data, className = "" }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cartItem.cart);

  const cartItemDetails = cartItem?.find(
    (item) => item.productId?._id === data?._id
  );

  const isAvailableCart = Boolean(cartItemDetails);
  const qty = cartItemDetails?.quantity || 0;

  const handleAddToCart = (e) => {
    console.log("Click");
    
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
        productId: data?._id,
        quantity: 1,
      })
    );
  };

  const increaseQty = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItemDetails?._id) return;

    dispatch(
      updateCartItemQty({
        id: cartItemDetails._id,
        qty: qty + 1,
      })
    );
  };

  const decreaseQty = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItemDetails?._id) return;

    if (qty === 1) {
      dispatch(deleteCartItem(cartItemDetails._id));
      toast.success("Item removed from cart", { duration: 1000 });
    } else {
      dispatch(
        updateCartItemQty({
          id: cartItemDetails._id,
          qty: qty - 1,
        })
      );
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
    <div className={className}>
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
          className={`${tailwindClasses.button.primary} px-4! py-1.5! text-sm whitespace-nowrap`}
        >
          Add
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
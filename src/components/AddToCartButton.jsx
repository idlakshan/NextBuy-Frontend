import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaMinus, FaPlus, FaPencilAlt } from "react-icons/fa";
import { tailwindClasses } from "../config/theme";
import {
  updateCartItemQty,
  deleteCartItem,
  addToCart,
} from "../store/slice/cartProductSlice";

const AddToCartButton = ({ data, className = "" }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const cart = useSelector((state) => state.cartItem.cart);
  const cartItemDetails = cart?.find(
    (item) => item.productId?._id === data?._id,
  );
  const isAvailableCart = Boolean(cartItemDetails);
  const qty = cartItemDetails?.quantity || 0;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const displayQty =
    qty % 1 === 0 ? qty.toString() : qty.toFixed(3).replace(/\.?0+$/, "");

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
        productId: data?._id,
        quantity: 1,
      }),
    );
  };

  const increaseQty = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItemDetails?._id) return;

    let increment = 0.5;
    if (qty < 1) increment = 0.25;
    else if (qty >= 5) increment = 1;

    const newQty = Math.min(qty + increment, data?.stock);

    dispatch(
      updateCartItemQty({
        id: cartItemDetails._id,
        qty: Number(newQty.toFixed(3)),
      }),
    );
  };

  const decreaseQty = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItemDetails?._id) return;

    let decrement = 0.5;
    if (qty <= 1) decrement = 0.25;
    else if (qty > 5) decrement = 1;

    const newQty = qty - decrement;

    if (newQty <= 0.001) {
      dispatch(deleteCartItem(cartItemDetails._id));
      toast.success("Item removed from cart", { duration: 1000 });
    } else {
      dispatch(
        updateCartItemQty({
          id: cartItemDetails._id,
          qty: Number(newQty.toFixed(3)),
        }),
      );
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (!cartItemDetails?._id) return;

    if (inputValue === "") return;

    let newQty = parseFloat(inputValue);
    if (isNaN(newQty) || newQty <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    newQty = Math.min(newQty, data?.stock);
    newQty = Number(newQty.toFixed(3));

    if (Math.abs(newQty - qty) > 0.001) {
      dispatch(
        updateCartItemQty({
          id: cartItemDetails._id,
          qty: newQty,
        }),
      );
    }
  };

  const handleQuantityClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAvailableCart) {
      setInputValue(displayQty);
      setIsEditing(true);
    }
  };

  if (data?.stock === 0) {
    return (
      <span className={tailwindClasses.button.cart.outOfStock}>
        Out of Stock
      </span>
    );
  }

  return (
    <div className={className}>
      {isAvailableCart ? (
        <div className={tailwindClasses.button.cart.container}>
          <button
            onClick={decreaseQty}
            className={tailwindClasses.button.cart.quantityBtn}
            title="Decrease quantity"
          >
            <FaMinus size={12} />
          </button>

          <div className="relative flex-1 mx-1">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={tailwindClasses.button.cart.input}
                placeholder="0.000"
                step="0.1"
                min="0"
                max={data?.stock}
              />
            ) : (
              <div
                onClick={handleQuantityClick}
                className={
                  tailwindClasses.button.cart.quantityDisplay.container
                }
              >
                <span
                  className={tailwindClasses.button.cart.quantityDisplay.value}
                >
                  {displayQty} {data?.unit || "kg"}
                </span>
                <FaPencilAlt
                  size={10}
                  className={
                    tailwindClasses.button.cart.quantityDisplay.editIcon
                  }
                />
              </div>
            )}
          </div>

          <button
            onClick={increaseQty}
            disabled={qty >= data?.stock}
            className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200
              ${
                qty >= data?.stock
                  ? tailwindClasses.button.cart.quantityBtnDisabled
                  : tailwindClasses.button.cart.quantityBtnActive
              }`}
            title="Increase quantity"
          >
            <FaPlus size={12} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className={tailwindClasses.button.cart.addToCart}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;

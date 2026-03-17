import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import imageEmpty from "../assets/empty_cart.webp";
import toast from "react-hot-toast";
import { theme, tailwindClasses } from "../config/theme";
import { BsTruck } from "react-icons/bs";
import { GiLeafSwirl } from "react-icons/gi";
import { BsBasket } from "react-icons/bs";
import AddToCartButton from "./AddToCartButton";

const DisplayCartItem = ({ close, isOpen }) => {
  const cartItem = useSelector((state) => state.cartItem.cart);
  const cartSummary = useSelector((state) => state.cartItem.summary);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const FREE_DELIVERY_THRESHOLD = 20000;
  const deliveryCharge = cartSummary.totalPrice < FREE_DELIVERY_THRESHOLD ? 350 : 0; 

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      navigate("/checkout");
      if (close) {
        close();
      }
      return;
    }
    toast("Please Login");
  };

  const savings = cartSummary.notDiscountTotalPrice - cartSummary.totalPrice;
  const amountForFreeDelivery = FREE_DELIVERY_THRESHOLD - cartSummary.totalPrice;
  
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 bg-white border-b border-green-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <BsBasket size={20} className="text-green-600" />
            </div>
            <div>
              <h2
                className={`text-lg font-semibold ${theme.colors.solid.sectionTitle}`}
              >
                Shopping Cart
              </h2>
              <p className="text-xs text-gray-500">
                {cartItem?.length || 0}{" "}
                {cartItem?.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            onClick={close}
            className="p-2 hover:bg-green-50 rounded-full transition-colors"
          >
            <IoClose size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="h-[calc(100vh-180px)] overflow-y-auto scrollbarCustom p-4 space-y-3">
          {cartItem && cartItem.length > 0 ? (
            <>
              {savings > 0 && (
                <div className="bg-linear-to-r from-green-50 to-lime-50 border border-green-100 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Savings</span>
                    <span className="text-lg font-bold text-green-600">
                      {DisplayPriceInRupees(savings)}
                    </span>
                  </div>
                </div>
              )}

              {cartItem.map((item) => (
                <div
                  key={item?._id + "cartItemDisplay"}
                  className="bg-white border border-green-50 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    <div className="w-20 h-20 bg-green-50 rounded-lg p-2 shrink-0">
                      <img
                        src={item?.productId?.image[0]}
                        alt={item?.productId?.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">
                        {item?.productId?.name}
                      </h3>

                      <p className="text-xs text-gray-400 mb-2">
                        {item?.productId?.unit}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-green-700 text-sm">
                            {DisplayPriceInRupees(
                              pricewithDiscount(
                                item?.productId?.price,
                                item?.productId?.discount,
                              ),
                            )}
                          </span>
                          {item?.productId?.discount > 0 && (
                            <span className="text-[10px] text-gray-400 line-through ml-2">
                              {DisplayPriceInRupees(item?.productId?.price)}
                            </span>
                          )}
                        </div>

                        {item?.productId?.isOrganic && (
                          <GiLeafSwirl size={14} className="text-emerald-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-green-50 pt-3">
                    <AddToCartButton data={item?.productId} />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-12">
              <div className="w-40 h-40 mb-4 opacity-75">
                <img
                  src={imageEmpty}
                  alt="Empty cart"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3
                className={`text-lg font-semibold ${theme.colors.solid.sectionTitle} mb-2`}
              >
                Your cart is empty
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Looks like you haven't added anything to your cart yet
              </p>
              <Link
                to="/"
                onClick={close}
                className={tailwindClasses.button.primary}
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>

        {cartItem && cartItem.length > 0 && (
          <div className="sticky bottom-0 bg-white border-t border-green-100 p-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-800">
                  {DisplayPriceInRupees(cartSummary.notDiscountTotalPrice)}
                </span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600 font-medium">
                    - {DisplayPriceInRupees(savings)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery</span>
                {deliveryCharge === 0 ? (
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <BsTruck size={12} />
                    Free
                  </span>
                ) : (
                  <span className="text-orange-600 font-medium">
                    {DisplayPriceInRupees(deliveryCharge)}
                  </span>
                )}
              </div>

              <div className="border-t border-green-100 my-2 pt-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="font-bold text-lg text-green-700">
                    {DisplayPriceInRupees(cartSummary.totalPrice + deliveryCharge)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Total Quantity: {cartSummary.totalQty} {cartSummary.totalQty === 1 ? "item" : "items"}
                </p>
              </div>
            </div>

            <div className={`flex items-center gap-2 text-xs p-2 rounded-lg mb-3 ${
              deliveryCharge === 0 
                ? 'bg-green-50 text-green-600' 
                : 'bg-orange-50 text-orange-600'
            }`}>
              <BsTruck size={14} />
              {deliveryCharge === 0 ? (
                <span>You have qualified for free delivery!</span>
              ) : (
                <span>
                  Add {DisplayPriceInRupees(amountForFreeDelivery)} more for free delivery
                </span>
              )}
            </div>

            <button
              onClick={redirectToCheckoutPage}
              className={`${tailwindClasses.button.primary} w-full py-3 flex items-center justify-center gap-2 text-base`}
            >
              Proceed to Checkout
              <FaCaretRight size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayCartItem;
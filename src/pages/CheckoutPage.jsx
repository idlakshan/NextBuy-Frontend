import { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useSelector } from "react-redux";
import { tailwindClasses, theme } from "../config/theme";
import {
  FaLock,
  FaCreditCard,
  FaMoneyBillWave,
  FaShieldAlt,
  FaLeaf,
} from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import Address from "./Address";

const CheckoutPage = () => {
  const cartSummary = useSelector((state) => state.cartItem.summary);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("online");

  const FREE_DELIVERY_THRESHOLD = 20000;
  const deliveryCharge =
    cartSummary?.totalPrice < FREE_DELIVERY_THRESHOLD ? 350 : 0;
  const savings =
    (cartSummary?.notDiscountTotalPrice || 0) - (cartSummary?.totalPrice || 0);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1
            className={`text-3xl md:text-4xl font-bold ${theme.colors.solid.sectionTitle} mb-4`}
          >
            Checkout
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <Address
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          </div>

          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 sticky top-4">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FaShieldAlt className="text-green-600" size={20} />
                  Order Summary
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>
                      {DisplayPriceInRupees(
                        cartSummary?.notDiscountTotalPrice || 0,
                      )}
                    </span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-green-600 bg-green-50 p-2 rounded-lg">
                      <span className="flex items-center gap-1">
                        <MdDiscount size={16} />
                        Total Savings
                      </span>
                      <span className="font-medium">
                        - {DisplayPriceInRupees(savings)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge</span>
                    {deliveryCharge === 0 ? (
                      <span className="text-green-600 font-medium flex items-center gap-1">
                        <FaLeaf size={12} />
                        Free
                      </span>
                    ) : (
                      <span>{DisplayPriceInRupees(deliveryCharge)}</span>
                    )}
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Total Qty</span>
                    <span>{cartSummary?.totalQty || 0} items</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      Total
                    </span>
                    <div className="text-right">
                      <span
                        className={`text-2xl font-bold ${theme.colors.solid.sectionTitle}`}
                      >
                        {DisplayPriceInRupees(
                          (cartSummary?.totalPrice || 0) + deliveryCharge,
                        )}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        Inclusive of all taxes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <h3 className="font-medium text-gray-700">Payment Method</h3>

                  <label
                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === "online"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-green-600 focus:ring-green-500"
                    />
                    <FaCreditCard className="text-green-600" size={20} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        Online Payment
                      </p>
                      <p className="text-xs text-gray-500">Credit/Debit Card</p>
                    </div>
                    <FaLock className="text-gray-400" size={14} />
                  </label>

                  <label
                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-green-600 focus:ring-green-500"
                    />
                    <FaMoneyBillWave className="text-green-600" size={20} />
                    <div>
                      <p className="font-medium text-gray-800">
                        Cash on Delivery
                      </p>
                      <p className="text-xs text-gray-500">
                        Pay when you receive
                      </p>
                    </div>
                  </label>
                </div>

                <button
                  className={`${tailwindClasses.button.primary} w-full py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all`}
                >
                  Place Order •{" "}
                  {DisplayPriceInRupees(
                    (cartSummary?.totalPrice || 0) + deliveryCharge,
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2">
                  <FaLock size={12} />
                  <span>Secure Encrypted Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

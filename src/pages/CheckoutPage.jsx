import { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useSelector } from "react-redux";
import { tailwindClasses, theme } from "../config/theme";
import {
  FaTruck,
  FaLock,
  FaCreditCard,
  FaMoneyBillWave,
  FaPlus,
  FaShieldAlt,
  FaLeaf,
} from "react-icons/fa";
import { MdDiscount, MdDeliveryDining } from "react-icons/md";
import { BsBasket } from "react-icons/bs";

const CheckoutPage = () => {
  const cartSummary = useSelector((state) => state.cartItem.summary);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("online");

  const FREE_DELIVERY_THRESHOLD = 20000;
  const deliveryCharge =
    cartSummary?.totalPrice < FREE_DELIVERY_THRESHOLD ? 350 : 0;
  const savings =
    (cartSummary?.notDiscountTotalPrice || 0) - (cartSummary?.totalPrice || 0);

  const sampleAddresses = [
    {
      id: 1,
      name: "Office",
      address_line: "456 Business Park, Floor 7",
      city: "Panadura",
      state: "Western",
      country: "Sri Lanka",
      pincode: "400093",
      mobile: "0786756567",
    },
  ];

  return (
    <div className="min-h-screen via-lime-50/50 to-yellow-50/50">
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
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 ">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <FaTruck className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Delivery Address
                    </h2>
                    <p className="text-sm text-gray-500">
                      Select where to deliver your order
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {sampleAddresses.map((address, index) => (
                  <label
                    key={address.id}
                    className={`block cursor-pointer transition-all duration-200 ${
                      selectedAddress === index ? "scale-[1.02]" : ""
                    }`}
                  >
                    <div
                      className={`relative border-2 rounded-xl p-5 ${
                        selectedAddress === index
                          ? "border-green-500 bg-green-50/50 shadow-md"
                          : "border-gray-200 hover:border-green-200 hover:bg-green-50/30"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="pt-1">
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddress === index}
                            onChange={() => setSelectedAddress(index)}
                            className="w-5 h-5 text-green-600 focus:ring-green-500"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="text-gray-800 font-medium mb-1">
                            {address.address_line}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-gray-600 text-sm mt-2 flex items-center gap-2">
                            <span className="text-gray-400">📞</span>
                            {address.mobile}
                          </p>
                        </div>

                        {selectedAddress === index && (
                          <div className="absolute top-2 right-2">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                ))}

                <button className="w-full py-4 border-2 border-dashed border-green-300 rounded-xl text-green-600 hover:bg-green-50 transition-all flex items-center justify-center gap-2 group">
                  <FaPlus
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="font-medium">Add New Address</span>
                </button>
              </div>
            </div>
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
                        cartSummary?.notDiscountTotalPrice || 1250,
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
                    <span>Total Items</span>
                    <span>{cartSummary?.totalQty || 4} items</span>
                  </div>
                </div>

                {/* Grand Total */}
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
                          (cartSummary?.totalPrice || 1150) + deliveryCharge,
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
                    (cartSummary?.totalPrice || 1150) + deliveryCharge,
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

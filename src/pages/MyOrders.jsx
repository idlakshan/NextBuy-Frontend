import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../store/slice/orderSlice";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { tailwindClasses, theme } from "../config/theme";
import { FaTruck, FaTag } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order, loading } = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const groupedOrders = useMemo(() => {
    if (!order || order.length === 0) return [];

    const groups = {};

    order.forEach((item) => {
      const orderId = item.orderId;
      if (!groups[orderId]) {
        groups[orderId] = {
          ...item,
          items: [],
          totalItems: 0,
          subtotal: 0,
          totalDiscount: 0,
          originalPrice: 0,
          deliveryCharge: item.deliveryCharge || 0,
          orderTotal: item.orderTotal || 0,
        };
      }

      const originalPrice =
        (item.product_details?.price || 0) * (item.quantity || 1);
      const discountedPrice = item.itemSubTotal || 0;
      const itemDiscount = originalPrice - discountedPrice;

      groups[orderId].items.push(item);
      groups[orderId].totalItems += item.quantity || 1;
      groups[orderId].subtotal += discountedPrice;
      groups[orderId].originalPrice += originalPrice;
      groups[orderId].totalDiscount += itemDiscount;
    });

    return Object.values(groups);
  }, [order]);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  const getStatusBadgeClass = (status) => {
    if (status === "PAID" || status === "CASH ON DELIVERY") {
      return "bg-green-100 text-green-800";
    } else if (status === "PENDING") {
      return "bg-yellow-100 text-yellow-800";
    } else if (status === "CANCELLED") {
      return "bg-red-100 text-red-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className={`text-2xl md:text-3xl font-bold ${theme.colors.solid.sectionTitle} mb-6`}
      >
        My Orders
      </h1>

      {groupedOrders?.length > 0 ? (
        <div className="space-y-6">
          {groupedOrders.map((orderGroup) => (
            <div
              key={orderGroup.orderId}
              className="bg-white rounded-lg shadow-sm border border-green-50 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="bg-green-50/50 px-4 py-3 border-b border-green-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-sm text-gray-500">Order ID: </span>
                    <span className="font-medium text-gray-800">
                      {orderGroup.orderId}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Date: </span>
                    <span className="text-sm text-gray-700">
                      {new Date(orderGroup.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(orderGroup.payment_status)}`}
                    >
                      {orderGroup.payment_status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {orderGroup.items.map((item, index) => {
                  const originalPrice =
                    (item.product_details?.price || 0) * (item.quantity || 1);
                  const discount = item.product_details?.discount || 0;

                  return (
                    <div key={item._id || index} className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-green-50 rounded-lg overflow-hidden shrink-0 border border-green-100 relative">
                          {item.product_details?.image && (
                            <img
                              src={
                                item.product_details.image[0] ||
                                item.product_details.image
                              }
                              alt={item.product_details.name}
                              className="w-full h-full object-contain"
                            />
                          )}
                          {discount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-bl-lg">
                              -{discount}%
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">
                            {item.product_details?.name || "Product"}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Quantity: {item.quantity}{" "}
                            {item.product_details?.unit}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {discount > 0 ? (
                              <>
                                <span className="text-sm line-through text-gray-400">
                                  {DisplayPriceInRupees(
                                    item.product_details?.price,
                                  )}
                                </span>
                                <span className="text-sm font-medium text-green-600">
                                  {DisplayPriceInRupees(
                                    (item.product_details?.price *
                                      (100 - discount)) /
                                      100,
                                  )}{" "}
                                  each
                                </span>
                                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                                  -{discount}%
                                </span>
                              </>
                            ) : (
                              <span className="text-sm text-gray-700">
                                {DisplayPriceInRupees(
                                  item.product_details?.price,
                                )}{" "}
                                each
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm font-medium text-gray-700">
                              Item Total:
                            </p>
                            <div className="text-right">
                              {discount > 0 && (
                                <p className="text-xs line-through text-gray-400">
                                  {DisplayPriceInRupees(originalPrice)}
                                </p>
                              )}
                              <p
                                className={`text-base font-bold ${discount > 0 ? "text-green-600" : "text-gray-800"}`}
                              >
                                {DisplayPriceInRupees(item.itemSubTotal)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <div className="space-y-2">
                  {orderGroup.totalDiscount > 0 && (
                    <div className="flex justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaTag className="text-gray-400" size={12} />
                        Original Price
                      </span>
                      <span className="line-through">
                        {DisplayPriceInRupees(orderGroup.originalPrice)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal ({orderGroup.totalItems} items)</span>
                    <span>{DisplayPriceInRupees(orderGroup.subtotal)}</span>
                  </div>

                  {orderGroup.totalDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                      <span className="flex items-center gap-1">
                        <MdDiscount size={16} />
                        Total Discount
                      </span>
                      <span className="font-medium">
                        - {DisplayPriceInRupees(orderGroup.totalDiscount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaTruck className="text-green-600" size={14} />
                      Delivery Charge
                    </span>
                    {orderGroup.deliveryCharge > 0 ? (
                      <span>
                        {DisplayPriceInRupees(orderGroup.deliveryCharge)}
                      </span>
                    ) : (
                      <span className="text-green-600 font-medium">Free</span>
                    )}
                  </div>

                  <div className="border-t border-gray-200 my-2"></div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">
                      Order Total
                    </span>
                    <div className="text-right">
                      <span
                        className={`text-xl font-bold ${theme.colors.solid.sectionTitle}`}
                      >
                        {DisplayPriceInRupees(orderGroup.orderTotal)}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">
                        {orderGroup.totalDiscount > 0 && (
                          <span>
                            You saved{" "}
                            {DisplayPriceInRupees(orderGroup.totalDiscount)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {orderGroup.delivery_address && (
                <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Deliver to:</span>{" "}
                  {orderGroup.delivery_address.name},{" "}
                  {orderGroup.delivery_address.address},{" "}
                  {orderGroup.delivery_address.city},{" "}
                  {orderGroup.delivery_address.state} -{" "}
                  {orderGroup.delivery_address.pincode}
                  {orderGroup.delivery_address.mobile && (
                    <> • Mobile: {orderGroup.delivery_address.mobile}</>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-green-50 p-8">
          <div className="text-gray-300 text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No orders yet
          </h3>
          <p className="text-gray-500 mb-4">You haven't placed any orders</p>
          <button
            onClick={() => navigate("/")}
            className={tailwindClasses.button.primary}
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../store/slice/orderSlice";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { tailwindClasses, theme } from "../config/theme";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order, loading } = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  console.log(order);

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

      {order?.length > 0 ? (
        <div className="space-y-4">
          {order.map((orderItem) => (
            <div
              key={orderItem._id}
              className="bg-white rounded-lg shadow-sm border border-green-50 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="bg-green-50/50 px-4 py-3 border-b border-green-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-sm text-gray-500">Order ID: </span>
                    <span className="font-medium text-gray-800">
                      {orderItem.orderId}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Date: </span>
                    <span className="text-sm text-gray-700">
                      {new Date(orderItem.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(orderItem.payment_status)}`}
                    >
                      {orderItem.payment_status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-green-50 rounded-lg overflow-hidden shrink-0 border border-green-100">
                    {orderItem.product_details?.image && (
                      <img
                        src={
                          orderItem.product_details.image[0] ||
                          orderItem.product_details.image
                        }
                        alt={orderItem.product_details.name}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {orderItem.product_details?.name || "Product"}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Quantity: {orderItem.quantity}{" "}
                      {orderItem.product_details?.unit}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price:{" "}
                      {DisplayPriceInRupees(orderItem.product_details?.price)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p
                      className={`text-lg font-bold ${theme.colors.solid.sectionTitle}`}
                    >
                      {DisplayPriceInRupees(orderItem.orderTotal)}
                    </p>
                  </div>
                </div>
              </div>

              {orderItem.delivery_address && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Deliver to:</span>{" "}
                  {orderItem.delivery_address.name},{" "}
                  {orderItem.delivery_address.city},{" "}
                  {orderItem.delivery_address.state}
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

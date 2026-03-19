import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { fetchCartItems, clearCart } from "../store/slice/cartProductSlice";
import { fetchOrders } from "../store/slice/orderSlice";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);

  const cartItems = useSelector((state) => state.cartItem.cart);

  useEffect(() => {
    const processOrder = async () => {
      try {
        if (location.state?.type === "cod") {
          setOrderId(location.state.orderId);

          dispatch(clearCart());

          await dispatch(fetchCartItems());
          await dispatch(fetchOrders());

          setLoading(false);
          return;
        }

        const sessionId = searchParams.get("session_id");
        const orderIdFromUrl = searchParams.get("order_id");
        const pendingOrderId = sessionStorage.getItem("pendingOrderId");

        const finalOrderId = orderIdFromUrl || pendingOrderId;
        if (finalOrderId) {
          setOrderId(finalOrderId);
        }

        sessionStorage.removeItem("pendingOrderId");
        sessionStorage.removeItem("pendingSessionId");
        if (cartItems?.length > 0) {
          dispatch(clearCart());
        }

        if (sessionId && finalOrderId) {
          Axios({
            ...SummaryApi.verifyPayment,
            data: {
              session_id: sessionId,
              order_id: finalOrderId,
            },
          })
            .then(() => {
              dispatch(fetchCartItems());
              dispatch(fetchOrders());
            })
            .catch((err) => console.log("Background verification:", err));
        }

        await dispatch(fetchCartItems());
        await dispatch(fetchOrders());
      } catch (error) {
        console.error("Order processing error:", error);
        dispatch(clearCart());
      } finally {
        setLoading(false);
      }
    };

    processOrder();
  }, [searchParams, location.state, dispatch, cartItems?.length]);

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleViewOrders = () => {
    navigate("/dashboard/my-orders");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Processing your order...
          </h2>
          <p className="text-gray-500">
            Please wait while we confirm your order.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {location.state?.type === "cod"
            ? "Order Placed Successfully!"
            : "Payment Successful!"}
        </h2>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Order ID</p>
            <p className="font-mono text-lg font-semibold text-gray-700">
              {orderId}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleViewOrders}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            View My Orders
          </button>
          <button
            onClick={handleContinueShopping}
            className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { fetchCartItems } from "../store/slice/cartProductSlice";
import { fetchOrders } from "../store/slice/orderSlice";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const verifyPaymentAndSaveOrder = async () => {
      const sessionId = searchParams.get('session_id');
      const orderId = searchParams.get('order_id');
      
      // Also check session storage for pending order
      const pendingOrderId = sessionStorage.getItem('pendingOrderId');
      
      const finalOrderId = orderId || pendingOrderId;

      if (!sessionId || !finalOrderId) {
        setError("Missing payment information");
        setVerifying(false);
        return;
      }

      try {
        const response = await Axios({
          ...SummaryApi.verifyPayment,
          data: {
            session_id: sessionId,
            order_id: finalOrderId,
          },
        });

        const { data: responseData } = response;

        if (responseData.success) {
          setOrderDetails(responseData.data);
          
          // Clear pending order from session storage
          sessionStorage.removeItem('pendingOrderId');
          sessionStorage.removeItem('pendingSessionId');
          
          // Refresh cart and orders
          await dispatch(fetchCartItems());
          await dispatch(fetchOrders());
          
          toast.success("Payment successful! Your order has been placed.");
        } else {
          setError(responseData.message || "Failed to verify payment");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setError(error.response?.data?.message || "Failed to verify payment");
      } finally {
        setVerifying(false);
      }
    };

    verifyPaymentAndSaveOrder();
  }, [searchParams, dispatch]);

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleViewOrders = () => {
    navigate("/orders");
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Verifying your payment...
          </h2>
          <p className="text-gray-500">
            Please wait while we confirm your order.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-5xl mb-4">✕</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Payment Verification Failed
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={handleContinueShopping}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        
        {orderDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Order ID</p>
            <p className="font-mono text-lg font-semibold text-gray-700">
              {orderDetails.orderId}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Total: Rs. {orderDetails.orderTotal.toLocaleString()}
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
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { tailwindClasses } from "../config/theme";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, orderId } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard/my-orders");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-lime-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Successful!
        </h1>

        <p className="text-gray-600 mb-4">
          {type === "cod"
            ? "Your order has been placed successfully."
            : "Payment completed and order confirmed."}
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-6">Order ID: #{orderId}</p>
        )}

        <button
          onClick={() => navigate("/orders")}
          className={`${tailwindClasses.button.primary} w-full py-3 mb-3`}
        >
          View Orders
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full py-3 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
        >
          Continue Shopping
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Redirecting to orders in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;

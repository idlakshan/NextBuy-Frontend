import React from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { tailwindClasses, theme } from "../config/theme";
import toast from "react-hot-toast";

const AddAddress = ({ close, onAddressAdded }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newAddress = {
      id: 2,
      ...data,
    };

    onAddressAdded(newAddress);
    toast.success("Address added successfully!");
    reset();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className={`${tailwindClasses.card.container} w-full max-w-lg animate-fadeIn`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-full">
              <FaMapMarkerAlt className="text-green-600" size={20} />
            </div>
            <h2
              className={`text-xl font-semibold ${theme.colors.solid.sectionTitle}`}
            >
              Add New Address
            </h2>
          </div>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="address_line"
              className="block text-sm font-medium text-gray-700"
            >
              Address Line
            </label>
            <input
              type="text"
              id="address_line"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.address_line ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Street address, apartment, etc."
              {...register("address_line", { required: "Address is required" })}
            />
            {errors.address_line && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address_line.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="City"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.state ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="State"
                {...register("state", { required: "State is required" })}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-gray-700"
              >
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.pincode ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Pincode"
                {...register("pincode", {
                  required: "Pincode is required",
                  pattern: {
                    value: /^\d{5}$/,
                    message: "Please enter a valid 6-digit pincode",
                  },
                })}
              />
              {errors.pincode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pincode.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Country"
                defaultValue="Sri Lanka"
                {...register("country", { required: "Country is required" })}
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="10-digit mobile number"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid 10-digit mobile number",
                },
              })}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={close}
              className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 ${tailwindClasses.button.primary} py-3`}
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTruck, FaPlus, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";
import { tailwindClasses, theme } from "../config/theme";
import { fetchAddresses } from "../store/slice/addressSlice";
import AddAddress from "../components/AddAddress";

const Address = ({ selectedAddress, setSelectedAddress }) => {
  const dispatch = useDispatch();
  const [showAddAddress, setShowAddAddress] = useState(false);
  const { addressList, loading } = useSelector((state) => state.address);
  const activeAddresses = addressList?.filter((addr) => addr.status) || [];

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (
      activeAddresses.length > 0 &&
      selectedAddress >= activeAddresses.length
    ) {
      setSelectedAddress(0);
    }
  }, [activeAddresses.length, selectedAddress, setSelectedAddress]);

  const handleAddressAdded = () => {
    dispatch(fetchAddresses());
  };

  return (
    <>
      <div className={`${tailwindClasses.card.container} overflow-hidden`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <FaTruck className="text-green-600" size={24} />
            </div>
            <div>
              <h2
                className={`text-xl font-semibold ${theme.colors.solid.sectionTitle}`}
              >
                Delivery Address
              </h2>
              <p className="text-sm text-gray-500">
                {loading
                  ? "Loading addresses..."
                  : activeAddresses.length > 0
                    ? "Select where to deliver your order"
                    : "No addresses found. Please add an address."}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {activeAddresses.map((address, index) => (
                <label
                  key={address._id}
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
                          className="w-5 h-5 accent-green-600 focus:ring-green-500"
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
                          <FaPhoneAlt className="text-gray-400" size={12} />
                          {address.mobile}
                        </p>
                      </div>

                      {selectedAddress === index && (
                        <div className="absolute top-2 right-2">
                          <FaCheckCircle className="text-green-500 w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </div>
                </label>
              ))}

              <button
                onClick={() => setShowAddAddress(true)}
                className="w-full py-4 border-2 border-dashed border-green-300 rounded-xl text-green-600 hover:bg-green-50 transition-all flex items-center justify-center gap-2 group"
              >
                <FaPlus
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-medium">Add New Address</span>
              </button>
            </>
          )}
        </div>
      </div>

      {showAddAddress && (
        <AddAddress
          close={() => {
            setShowAddAddress(false);
            handleAddressAdded();
          }}
        />
      )}
    </>
  );
};

export default Address;

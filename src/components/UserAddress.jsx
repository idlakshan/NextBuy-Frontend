import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMapMarkerAlt, FaPlus, FaPhoneAlt, FaEdit, FaTrash } from "react-icons/fa";
import { tailwindClasses, theme } from "../config/theme";
import AddAddress from "./AddAddress";
import EditAddressDetails from "./EditAddressDetails";
import { fetchAddresses } from "../store/slice/addressSlice";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UserAddress = () => {
  const dispatch = useDispatch();
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  const { addressList, loading } = useSelector((state) => state.address);
  const activeAddresses = addressList?.filter(addr => addr.status) || [];

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        const response = await Axios({
          ...SummaryApi.disableAddress,
          data: { _id: id },
        });

        if (response.data.success) {
          toast.success("Address deleted successfully!");
          dispatch(fetchAddresses());
        }
      } catch (error) {
        AxiosToastError(error);
      }
    }
  };

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setShowEditAddress(true);
  };

  return (
    <>
      <div className={`${tailwindClasses.card.container} overflow-hidden`}>
        <div className="p-6 border-b border-gray-100 bg-linear-to-r from-green-50 to-lime-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <FaMapMarkerAlt className="text-green-600" size={24} />
              </div>
              <div>
                <h2
                  className={`text-xl font-semibold ${theme.colors.solid.sectionTitle}`}
                >
                  My Addresses
                </h2>
                <p className="text-sm text-gray-500">
                  {loading 
                    ? "Loading addresses..." 
                    : activeAddresses.length > 0
                    ? `You have ${activeAddresses.length} saved address${activeAddresses.length > 1 ? 'es' : ''}`
                    : "No addresses found"}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowAddAddress(true)}
              className={`${tailwindClasses.button.primary} flex items-center gap-2 px-4 py-2`}
            >
              <FaPlus size={14} />
              <span>Add New</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {activeAddresses.length > 0 ? (
                activeAddresses.map((address) => (
                  <div
                    key={address._id}
                    className="group relative border-2 border-gray-200 rounded-xl p-5 hover:border-green-200 hover:bg-green-50/30 transition-all"
                  >
                    <div className="flex items-start gap-4">
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

                      <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(address)}
                          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all"
                          title="Edit address"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(address._id)}
                          className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all"
                          title="Delete address"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-4 bg-green-50 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No addresses yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add your first address to get started
                  </p>
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className={`${tailwindClasses.button.primary} inline-flex items-center gap-2`}
                  >
                    <FaPlus size={14} />
                    Add New Address
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showAddAddress && (
        <AddAddress
          close={() => setShowAddAddress(false)}
        />
        
      )}
      {showEditAddress && selectedAddress && (
        <EditAddressDetails
          data={selectedAddress}
          close={() => {
            setShowEditAddress(false);
            setSelectedAddress(null);
          }}
        />
      )}
    </>
  );
};

export default UserAddress;
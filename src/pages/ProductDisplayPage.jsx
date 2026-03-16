import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import Divider from "../components/Divider";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import ProductCart from "../components/ProductCart";
import { theme, tailwindClasses } from "../config/theme";
import { GiLeafSwirl } from "react-icons/gi";
import { BsTruck, BsInfoCircle } from "react-icons/bs";
import { MdOutlineDescription, MdOutlineCategory } from "react-icons/md";
import { TbWeight } from "react-icons/tb";

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: [],
    description: "",
    unit: "",
    price: 0,
    discount: 0,
    stock: 0,
    more_details: {},
  });
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.get_product_details,
        data: { productId },
      });
      if (response.data?.success) {
        setData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const truncateDescription = (text, limit = 100) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  return (
    <section className="container mx-auto px-4 py-6">
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <div
              className={`${tailwindClasses.card.container} p-4 h-64 lg:h-96 flex items-center justify-center`}
            >
              <img
                src={data.image[image]}
                alt={data.name}
                className="h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="relative mt-3 group">
              <div
                ref={imageContainer}
                className="flex gap-2 overflow-x-auto scrollbarCustom py-2 scroll-smooth"
              >
                {data.image.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImage(i)}
                    className={`w-16 h-16 border-2 rounded-lg overflow-hidden shrink-0 transition-all
                      ${
                        i === image
                          ? "border-green-500 shadow-md"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${data.name} thumbnail ${i + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>

              {data.image.length > 5 && (
                <>
                  <button
                    onClick={handleScrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaAngleLeft className="text-green-600" />
                  </button>
                  <button
                    onClick={handleScrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaAngleRight className="text-green-600" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <span
                className={
                  tailwindClasses.grocery.priceTag + " flex items-center gap-1"
                }
              >
                <BsTruck size={12} /> 10-15 min in Colombo Area
              </span>
              {data.discount > 0 && (
                <span
                  className={
                    tailwindClasses.badge.discount + " text-xs px-3 py-1.5"
                  }
                >
                  {data.discount}% OFF
                </span>
              )}
              {data.isOrganic && (
                <span
                  className={
                    tailwindClasses.grocery.organicBadge +
                    " flex items-center gap-1"
                  }
                >
                  <GiLeafSwirl size={12} /> Organic
                </span>
              )}
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
              {data.name}
            </h1>

            <p className="text-gray-500 text-sm flex items-center gap-1">
              <TbWeight size={16} className="text-gray-400" />
              {data.unit}
            </p>

            <Divider />
            <div className="flex items-center gap-3">
              <span className="text-2xl lg:text-3xl font-bold text-green-700">
                {DisplayPriceInRupees(
                  pricewithDiscount(data.price, data.discount),
                )}
              </span>
              {data.discount > 0 && (
                <span className="text-gray-400 line-through text-sm">
                  {DisplayPriceInRupees(data.price)}
                </span>
              )}
            </div>

            {data.stock > 0 ? (
              <div className="space-y-2">
                {data.stock < 5 && (
                  <p className="text-sm text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg inline-block">
                    Only {data.stock} left in stock
                  </p>
                )}
                <ProductCart data={data} />
              </div>
            ) : (
              <p className="text-red-500 bg-red-50 px-4 py-3 rounded-lg text-center font-medium">
                Out of Stock
              </p>
            )}

            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <img src={image1} alt="Fast Delivery" className="h-8 mx-auto" />
                <p className="text-xs mt-1 font-medium text-gray-700">
                  Fast Delivery
                </p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <img src={image2} alt="Best Price" className="h-8 mx-auto" />
                <p className="text-xs mt-1 font-medium text-gray-700">
                  Best Price
                </p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <img src={image3} alt="Wide Range" className="h-8 mx-auto" />
                <p className="text-xs mt-1 font-medium text-gray-700">
                  Wide Range
                </p>
              </div>
            </div>

            {data.description && (
              <div className={tailwindClasses.card.container + " p-4 mt-4"}>
                <div className="flex items-center gap-2 mb-2">
                  <MdOutlineDescription size={18} className="text-green-600" />
                  <h3
                    className={`font-semibold ${theme.colors.solid.sectionTitle}`}
                  >
                    Description
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {showFullDescription
                    ? data.description
                    : truncateDescription(data.description, 150)}
                </p>
                {data.description.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-green-600 text-xs font-medium mt-2 hover:text-green-700 transition-colors"
                  >
                    {showFullDescription ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            )}

            {/* More Details Section */}
            {data.more_details && Object.keys(data.more_details).length > 0 && (
              <div className={tailwindClasses.card.container + " p-4"}>
                <div className="flex items-center gap-2 mb-3">
                  <BsInfoCircle size={18} className="text-green-600" />
                  <h3
                    className={`font-semibold ${theme.colors.solid.sectionTitle}`}
                  >
                    Additional Details
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(data.more_details).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <p className="text-gray-500 capitalize">
                        {key.replace(/_/g, " ")}
                      </p>
                      <p className="font-medium text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Info */}
            <div className="bg-green-50  rounded-xl p-4 text-sm text-gray-600 border border-green-100">
              <p className="font-medium text-green-700 mb-1 flex items-center gap-2">
                <BsTruck size={16} />✓ Free Delivery
              </p>
              <p className="ml-6">on orders above LKR 499</p>
              <p className="ml-6 mt-2 text-xs text-gray-500">
                Cash on delivery available
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDisplayPage;

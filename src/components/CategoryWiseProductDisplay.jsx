import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import CardProduct from "./CardProduct";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const loadingCardNumber = new Array(6).fill(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.get_product_by_category,
        data: {
          id: id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, [id]);

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const handleRedirectProductListpage = () => {
    const subcategory = subCategoryData.find((sub) => {
      return sub.category.some((c) => c._id === id);
    });

    return `/${valideURLConvert(name)}-${id}/${valideURLConvert(
      subcategory?.name || "subcategory",
    )}-${subcategory?._id || ""}`;
  };

  const redirectURL = handleRedirectProductListpage();

  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4 ">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link to={redirectURL} className="text-green-600 hover:text-green-400">
          See All
        </Link>
      </div>

      <div className="relative container mx-auto">
        <div
          ref={containerRef}
          className="flex gap-4 md:gap-6 lg:gap-8 px-4 overflow-x-auto scroll-smooth scrollbar-none"
        >
          {loading &&
            loadingCardNumber.map((_, index) => (
              <CardLoading key={"CategorywiseProductDisplay123" + index} />
            ))}

          {data.map((p, index) => (
            <div
              key={p._id + "CategorywiseProductDisplay" + index}
              className="shrink-0"
            >
              <CardProduct data={p} />
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 right-0 hidden lg:flex items-center justify-between px-2 pointer-events-none">
          <button
            onClick={handleScrollLeft}
            className="pointer-events-auto z-10 bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
          >
            <FaAngleLeft />
          </button>

          <button
            onClick={handleScrollRight}
            className="pointer-events-auto z-10 bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;

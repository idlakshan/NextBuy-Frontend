import { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import { theme, tailwindClasses } from "../config/theme"; 
import { GiLeafSwirl } from "react-icons/gi";
import { BsChevronRight } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { HiOutlineAdjustments } from "react-icons/hi";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const params = useParams();
  const AllSubCategory = useSelector((state) => state.product.allSubCategory);
  const [DisplaySubCatory, setDisplaySubCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    ?.join(" ");
  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductdata = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.get_product_by_category_and_subCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (page < totalPage) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchProductdata();
  }, [params, page]);

  useEffect(() => {
    const sub = AllSubCategory.filter((s) => {
      const filterData = s.category.some((el) => {
        return el._id == categoryId;
      });
      return filterData ? filterData : null;
    });
    setDisplaySubCategory(sub);

    const selected = sub.find((s) => s._id === subCategoryId);
    setSelectedSubCategory(selected);
  }, [params, AllSubCategory]);

  return (
    <section
      className={`bg-linear-to-b from-gray-50 via-white to-gray-50 min-h-screen`}
    >
      <div className="container mx-auto px-4 py-4">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <Link
            to="/"
            className="text-gray-500 hover:text-green-600 transition-colors"
          >
            Home
          </Link>
          <BsChevronRight size={10} className="text-gray-400" />
          <span className={theme.colors.solid.sectionTitle + " font-medium"}>
            {subCategoryName}
          </span>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 bg-white border border-green-200 rounded-lg px-3 py-2 text-sm"
          >
            <HiOutlineAdjustments className="text-green-600" />
            Filter Categories
          </button>
          <select className="text-xs border border-green-200 rounded-lg px-2 py-2 bg-white focus:ring-1 focus:ring-green-500 outline-none">
            <option>Sort: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>

        {/* Mobile Subcategory Sidebar (Dropdown) */}
        {showMobileFilter && (
          <div className="lg:hidden mb-4">
            <div className="bg-white rounded-xl shadow-md border border-green-100 overflow-hidden">
              <div
                className={`p-3 bg-linear-to-r ${theme.colors.gradient.cardBg} border-b border-green-100`}
              >
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                  <MdOutlineCategory size={18} className="text-green-600" />
                  Subcategories
                </h3>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {DisplaySubCatory.map((s, index) => {
                  const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
                  const isSelected = subCategoryId === s._id;

                  return (
                    <Link
                      key={index}
                      to={link}
                      className={`flex items-center gap-3 p-3 border-b border-green-50
                        ${isSelected ? "bg-green-50" : "hover:bg-green-50/50"}
                      `}
                    >
                      <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center p-1">
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span
                        className={`text-sm flex-1 ${isSelected ? theme.colors.solid.sectionTitle : "text-gray-600"}`}
                      >
                        {s.name}
                      </span>
                      {s.isOrganic && (
                        <GiLeafSwirl size={12} className="text-emerald-500" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block lg:w-80 shrink-0">
            <div
              className={`sticky top-20 bg-white rounded-xl ${theme.shadows.sm} border border-green-100 overflow-hidden`}
            >
              <div
                className={`p-4 bg-linear-to-r ${theme.colors.gradient.cardBg} border-b border-green-100`}
              >
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <MdOutlineCategory size={20} className="text-green-600" />
                  Categories
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {DisplaySubCatory.length} subcategories
                </p>
              </div>

              <div className="max-h-[calc(100vh-200px)] overflow-y-auto scrollbarCustom">
                {DisplaySubCatory.map((s, index) => {
                  const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
                  const isSelected = subCategoryId === s._id;

                  return (
                    <Link
                      key={index}
                      to={link}
                      className={`flex items-center gap-3 p-3 border-b border-green-50 transition-all duration-200
                        ${
                          isSelected
                            ? "bg-green-50 border-l-4 border-l-green-500"
                            : "hover:bg-green-50/50"
                        }
                      `}
                    >
                      <div className="w-12 h-12 bg-white rounded-lg shadow-xs flex items-center justify-center p-1.5 shrink-0">
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4
                          className={`text-sm font-medium truncate ${
                            isSelected
                              ? theme.colors.solid.sectionTitle
                              : "text-gray-700"
                          }`}
                        >
                          {s.name}
                        </h4>
                      </div>

                      {s.isOrganic && (
                        <GiLeafSwirl
                          size={14}
                          className="text-emerald-500 shrink-0"
                        />
                      )}
                    </Link>
                  );
                })}

                {DisplaySubCatory.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-sm text-gray-400">
                      No subcategories found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div
              className={`bg-white rounded-xl ${theme.shadows.sm} border border-green-100 p-4 mb-4`}
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    {subCategoryName}
                  </h2>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <span>{data.length} products found</span>
                    {selectedSubCategory?.description && (
                      <>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-xs text-gray-500">
                          {selectedSubCategory.description}
                        </span>
                      </>
                    )}
                  </p>
                </div>

                <div className="hidden lg:block">
                  <select className="text-sm border border-green-200 rounded-lg px-3 py-2 bg-white focus:ring-1 focus:ring-green-500 outline-none">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              className={`bg-white rounded-xl ${theme.shadows.sm} border border-green-100 p-4`}
            >
              {data.length === 0 && !loading ? (
                <div className="text-center py-16">
                  <div className="text-7xl mb-4">🛒</div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No products found
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Try checking other subcategories
                  </p>
                  <Link
                    to="/"
                    className={tailwindClasses.button.primary} // Using theme button class
                  >
                    Browse Home
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                    {data.map((p, index) => (
                      <CardProduct
                        data={p}
                        key={p._id + "productSubCategory" + index}
                      />
                    ))}
                  </div>

                  {page < totalPage && (
                    <div className="text-center mt-8">
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className={tailwindClasses.button.primary}
                      >
                        {loadingMore ? (
                          <span className="flex items-center gap-2">
                            <span
                              className={`w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full ${theme.animations.ping}`}
                            ></span>
                            Loading...
                          </span>
                        ) : (
                          "Load More Products"
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}

              {loading && page === 1 && (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 rounded-lg h-64 animate-pulse"
                    ></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {loadingMore && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full px-4 py-2 text-sm text-gray-600 z-50 flex items-center gap-2">
          <span
            className={`w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full ${theme.animations.ping}`}
          ></span>
          Loading more products...
        </div>
      )}
    </section>
  );
};

export default ProductListPage;
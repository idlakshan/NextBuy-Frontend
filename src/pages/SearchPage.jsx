import { useEffect, useState } from "react";
import CardLoading from "../components/CardLoading";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noDataImage from "../assets/nothing here yet.webp";
import { theme, tailwindClasses } from "../config/theme";
import { BiSearch } from "react-icons/bi";


const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingArrayCard = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
const searchText = new URLSearchParams(location.search).get("q") || "";
  //console.log(searchText);
  

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.search_product,
        data: {
          search: searchText,
          page: page,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData((prev) => [...prev, ...responseData.data]);
        }
        setTotalPage(responseData.totalPage);
        setHasMore(responseData.page < responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setData([]);
    fetchData();
  }, [searchText]);

  useEffect(() => {
    if (page > 1) {
      fetchData();
    }
  }, [page]);

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="bg-linear-to-b from-gray-50 via-white to-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-green-100 p-4 mb-6 sticky top-20 z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <BiSearch size={24} className="text-green-600" />
              </div>
              <div>
                <h2
                  className={`text-xl font-bold ${theme.colors.solid.sectionTitle}`}
                >
                  Search Results
                </h2>
                <p className="text-sm text-gray-500">
                  Found{" "}
                  <span className="font-semibold text-green-600">
                    {data.length}
                  </span>{" "}
                  products for "{searchText}"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden mb-4 text-sm text-gray-500">
          Showing {data.length} {data.length === 1 ? "result" : "results"}
        </div>

        <InfiniteScroll
          dataLength={data.length}
          next={handleFetchMore}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            </div>
          }
          endMessage={
            data.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">
                  You've seen all products
                </p>
              </div>
            )
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {data.map((p, index) => (
              <CardProduct data={p} key={p._id + "search" + index} />
            ))}

            {loading &&
              page === 1 &&
              loadingArrayCard.map((_, index) => (
                <CardLoading key={"loadingsearchpage" + index} />
              ))}
          </div>
        </InfiniteScroll>

        {!data[0] && !loading && (
          <div className="flex flex-col justify-center items-center w-full py-12">
            <div className="w-48 h-48 mb-4 opacity-75">
              <img
                src={noDataImage}
                alt="No results found"
                className="w-full h-full object-contain"
              />
            </div>
            <h3
              className={`text-xl font-semibold ${theme.colors.solid.sectionTitle} mb-2`}
            >
              No products found
            </h3>
            <p className="text-gray-500 text-sm text-center max-w-md mb-6">
              We couldn't find any products matching "{searchText}". Try
              searching with different keywords.
            </p>
            <button
              onClick={() => window.history.back()}
              className={tailwindClasses.button.primary}
            >
              Go Back
            </button>
          </div>
        )}

        {!data[0] && !loading && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 mb-3">You might try:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Vegetables", "Fruits", "Organic", "Fresh"].map((term) => (
                <button
                  key={term}
                  onClick={() =>
                    (window.location.href = `/search?q=${term.toLowerCase()}`)
                  }
                  className="px-3 py-1.5 bg-green-50 text-green-600 text-sm rounded-full hover:bg-green-100 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;

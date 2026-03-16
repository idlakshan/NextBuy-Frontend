import bannerDesktop from "../assets/banner.png";
import bannerMobile from "../assets/banner-mobile.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { valideURLConvert } from "../utils/valideURLConvert";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import { tailwindClasses } from "../config/theme";
import { FiArrowRight } from "react-icons/fi";
import { GiLeafSwirl, GiCarrot, GiAppleSeeds } from "react-icons/gi";
import { LuSprout } from "react-icons/lu";
import { TbLeaf } from "react-icons/tb";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => c._id == id);
      return filterData ? true : null;
    });
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
    navigate(url);
  };

  return (
    <section className="bg-linear-to-b from-green-50/30 via-white to-green-50/30">
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-green-100/50 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-lime-100/50 via-transparent to-transparent"></div>

        <div className="absolute top-10 left-1/4 text-green-400/30 animate-bounce">
          <GiLeafSwirl size={24} />
        </div>
        <div className="absolute bottom-10 right-1/4 text-lime-400/30 animate-pulse">
          <LuSprout size={28} />
        </div>
        <div className="absolute top-20 right-1/3 text-emerald-400/20 animate-spin-slow">
          <GiAppleSeeds size={20} />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="relative overflow-hidden rounded-2xl shadow-xl bg-linear-to-r from-green-800 to-emerald-800 group">
            <div className="absolute inset-0 bg-linear-to-r from-green-900/40 via-transparent to-emerald-900/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>

            <div className="absolute top-4 left-4 z-10">
              <span className={tailwindClasses.badge.fresh}>
                <GiLeafSwirl className="inline mr-1" size={12} />
                Fresh Produce Daily
              </span>
            </div>

            <picture>
              <source media="(max-width: 767px)" srcSet={bannerMobile} />
              <source media="(min-width: 768px)" srcSet={bannerDesktop} />
              <img
                src={bannerDesktop || bannerMobile}
                alt="Fresh groceries delivered to your door"
                className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="eager"
                fetchPriority="high"
              />
            </picture>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-lg flex items-center gap-2">
                Fresh Groceries
                <TbLeaf className="text-lime-300" size={24} />
              </h1>
              <p className="text-sm sm:text-base text-white/90 drop-shadow max-w-xl flex items-center gap-1">
                <GiCarrot className="inline" size={16} />
                Farm-fresh vegetables, fruits & organic products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 my-10">
        <div className="text-center mb-8">
          <div className="inline-block relative">
            <h2 className={tailwindClasses.section.title}>Shop by Category</h2>
            <div className={tailwindClasses.section.titleUnderline}></div>
          </div>
          <p className="text-gray-600 text-sm mt-4 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <TbLeaf className="text-green-500" size={18} />
            Fresh from farm to your table
            <TbLeaf className="text-lime-500" size={18} />
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-3">
          {loadingCategory
            ? new Array(14).fill(null).map((_, index) => (
                <div
                  key={index + "loadingcategory"}
                  className="bg-white rounded-2xl p-3 animate-pulse shadow-xs"
                >
                  <div className="bg-linear-to-br from-green-100 to-lime-100 aspect-square w-full rounded-xl mb-2"></div>
                  <div className="bg-green-100 h-3 w-2/3 rounded-full mx-auto"></div>
                </div>
              ))
            : categoryData.map((cat, index) => (
                <div
                  key={index}
                  className="group relative cursor-pointer"
                  onClick={() =>
                    handleRedirectProductListpage(cat._id, cat.name)
                  }
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={tailwindClasses.card.container}>
                    <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-lime-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:via-lime-500/10 group-hover:to-emerald-500/10 transition-all duration-500"></div>

                    <div className="relative p-3 pb-1">
                      <div className={tailwindClasses.card.imageContainer}>
                        <div
                          className={tailwindClasses.card.decorativeCircle}
                        ></div>

                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="object-contain h-4/5 w-4/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 relative z-10"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="relative px-2 pb-3 text-center">
                      <h3 className="text-gray-700 text-[11px] sm:text-xs font-medium tracking-wide truncate group-hover:text-green-700 transition-colors duration-200">
                        {cat.name}
                      </h3>
                      <div className={tailwindClasses.card.underline}></div>
                    </div>

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className={tailwindClasses.card.viewIndicator}>
                        <FiArrowRight size={8} className="inline" />
                      </span>
                    </div>

                    {cat.name.toLowerCase().includes("vegetable") ||
                    cat.name.toLowerCase().includes("fruit") ? (
                      <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-[6px] font-medium text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded-full">
                          Organic
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
        </div>
      </div>

      <div className="container mx-auto px-4 my-8">
        <div className="bg-linear-to-r from-green-600 to-emerald-600 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-full">
                <GiLeafSwirl size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Fresh Arrivals</h3>
                <p className="text-sm text-white/80">
                  New seasonal fruits & vegetables
                </p>
              </div>
            </div>
            <button className="bg-white text-green-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-50 transition-colors flex items-center gap-2">
              Shop Now <FiArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 my-12 space-y-10">
        {categoryData?.map((c, index) => (
          <div
            key={c?._id + "CategorywiseProduct"}
            className="relative"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute -top-4 left-0 right-0 h-px bg-linear-to-r from-transparent via-green-300 to-transparent"></div>

            <CategoryWiseProductDisplay
              key={c?._id + "CategorywiseProduct"}
              id={c?._id}
              name={c?.name}
            />
          </div>
        ))}
      </div>

      {/* <div className="fixed bottom-6 right-6 group">
        <button className={tailwindClasses.button.floating}>
          <HiOutlineMenu size={20} />
        </button>

        <div className="absolute bottom-16 right-0 bg-white rounded-xl shadow-xl p-2 w-56 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto border border-green-100">
          <p className="text-xs font-semibold text-green-600 px-3 py-2 flex items-center gap-1 border-b border-green-100">
            <TbLeaf size={14} />
            Shop by Category
          </p>
          <div className="max-h-60 overflow-y-auto">
            {categoryData?.slice(0, 8).map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
                className="block w-full text-left text-sm text-gray-700 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors items-center justify-between group/item"
              >
                <span className="flex items-center gap-2">
                  <GiCarrot size={14} className="text-green-500" />
                  {cat.name}
                </span>
                <FiArrowRight
                  size={12}
                  className="opacity-0 group-hover/item:opacity-100 transition-opacity text-green-500"
                />
              </button>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Home;

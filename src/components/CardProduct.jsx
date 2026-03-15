import React, { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { Link } from "react-router-dom";
import { valideURLConvert } from "../utils/valideURLConvert";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "./AddToCartButton";
import { GiLeafSwirl } from "react-icons/gi";

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={url}
      className="group bg-white w-52  rounded-md shadow-xs hover:shadow-sm transition-all duration-200 border border-green-50 overflow-hidden flex flex-col"
    >
      <div className="relative h-32 bg-linear-to-br from-green-50 to-lime-50">
        <div className="h-full w-full flex items-center justify-center p-1">
          <img
            src={data.image[0]}
            alt={data.name}
            className={`object-contain h-full w-full transition-transform duration-300 group-hover:scale-110 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>

        {data?.isOrganic && (
          <div className="absolute top-1 left-1 bg-emerald-100 rounded-full p-0.5">
            <GiLeafSwirl size={10} className="text-emerald-600" />
          </div>
        )}

        {data?.discount > 0 && (
          <div className="absolute top-1 right-1 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
            {data.discount}% OFF
          </div>
        )}
      </div>

      <div className="flex-1 p-2 flex flex-col justify-between mt-2">
        <h3 className="font-medium text-gray-800 text-xs line-clamp-2 leading-tight mb-1">
          {data.name}
        </h3>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-green-700 text-sm">
                {DisplayPriceInRupees(
                  pricewithDiscount(data.price, data.discount),
                )}
              </span>
              {data?.discount > 0 && (
                <span className="text-[8px] text-gray-400 line-through block">
                  {DisplayPriceInRupees(data.price)}
                </span>
              )}
            </div>

            {data.stock > 0 ? (
              <AddToCartButton data={data} />
            ) : (
              <span className="text-[9px] text-red-500 bg-red-50 px-2 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-[12px]">
            <span className="text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded-full">
              {data.unit}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;

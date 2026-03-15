const CardLoading = () => {
  return (
    <div className="group bg-white w-52 rounded-md border border-green-50 overflow-hidden flex flex-col animate-pulse">
      <div className="relative h-32 bg-linear-to-br from-green-50 to-lime-50">
        <div className="h-full w-full flex items-center justify-center p-1">
          <div className="h-full w-full rounded bg-green-100"></div>
        </div>
        <div className="absolute top-1 left-1 h-4 w-4 rounded-full bg-green-100"></div>
        <div className="absolute top-1 right-1 h-4 w-10 rounded-full bg-orange-100"></div>
      </div>
      <div className="flex-1 p-2 flex flex-col justify-between mt-2">
        <div className="space-y-1 mb-2">
          <div className="h-3 bg-gray-100 rounded w-full"></div>
          <div className="h-3 bg-gray-100 rounded w-3/4"></div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-4 bg-green-100 rounded w-20"></div>
              <div className="h-2 bg-gray-100 rounded w-14"></div>
            </div>

            <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <div className="h-5 bg-gray-100 rounded-full w-14"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLoading;

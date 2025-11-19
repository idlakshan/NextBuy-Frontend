import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200 ">
      <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
        <IoSearch size={22} />
      </button>
      <div>
        <TypeAnimation
          sequence={[
            'Search "milk"',
            1000, 
            'Search "bread"',
            1000,
            'Search "sugar"',
            1000,
            'Search "panner"',
            1000,
            'Search "chocolate"',
            1000,
            'Search "curd"',
            1000,
            'Search "rice"',
            1000,
            'Search "egg"',
            1000,
            'Search "chips"',
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </div>
    </div>
  );
};

export default Search;

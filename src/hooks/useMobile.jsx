import { useEffect, useState } from "react";

const useMobile = (breakpoint = 768) => {
  const getCheckPoint = () => window.innerWidth < breakpoint;

  const [isMobile, setIsMobile] = useState(getCheckPoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getCheckPoint());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return [isMobile];
};

export default useMobile;

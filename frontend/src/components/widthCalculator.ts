import { useState, useEffect } from "react";
export const width = () => {
  const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    return width;
  };

  const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  };

  return useWindowDimensions();
};
export default width;

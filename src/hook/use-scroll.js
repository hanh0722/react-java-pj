import { useEffect } from "react";
import useToggle from "./use-toggle";
const useScroll = (defaultValue) => {
  const {toggle, setToggle} = useToggle(false);
  useEffect(() => {
    let oldValue = 0;
    let newValue = 0;
    const getScrollHandler = () => {
      newValue = window.scrollY;
      if (oldValue < newValue && newValue > defaultValue) {
        setToggle(true);
      } else {
        setToggle(false);
      }
      oldValue = newValue;
    };
    window.addEventListener("scroll", getScrollHandler);
  }, [defaultValue, setToggle]);
  return toggle;
};

export default useScroll;

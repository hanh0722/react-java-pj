import { useState } from "react";

const useToggle = (initialValue) => {
    const [toggle, setToggle] = useState(initialValue ? initialValue : false);
    const changeToggleHandler = () => {
        setToggle(prevState => {
            return !prevState
        })
    }
    return {
        toggle,
        setToggle,
        changeToggleHandler
    }
}

export default useToggle;
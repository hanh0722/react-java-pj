import { useState } from "react";

const useQuantity = (defaultQuantity) => {
    const [quantity, setQuantity] = useState(defaultQuantity ? +defaultQuantity : 1);
    const incrementHandler = () => {
        if(quantity >= 100){
            return;
        }
        setQuantity(prevState => prevState + 1);
    }
    const decrementHandler = () => {
        if(quantity === 1){
            return;
        }
        setQuantity(prevState => prevState - 1);
    }
    return {
        incrementHandler,
        decrementHandler,
        quantity,
        setQuantity
    }
}

export default useQuantity;
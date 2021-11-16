import { useReducer, useCallback } from "react";
import { Type } from "./Type/Type";

const initialState = {
  loading: false,
  error: null,
  data: null,
  status: 200,
};
const reducerFn = (state, action) => {
  switch (action.type) {
    case Type.LOADING:
      return {
        ...state,
        loading: true,
      };
    case Type.ERROR: {
      return {
        ...state,
        error: action.payload.message,
        loading: false,
        status: action.payload.status,
      };
    }
    case Type.SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }
    case Type.RESET: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};
const useFetch = () => {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  const getDataFromServerHandler = useCallback(async (routeConfig) => {
    dispatch({
      type: Type.LOADING,
    });
    try {
      const response = await fetch(routeConfig.url, {
        ...routeConfig.options,
      });
      // if (!response.ok) {
      //   let message = "Something went wrong, please try again";
      //   const textErrorFromServer = await response.text();
      //   if(textErrorFromServer){
      //     message = textErrorFromServer;
      //   }
      //   const error = new Error(message);
      //   error.statusCode = response.status || 500;
      //   throw error;
      // }
      const data = await response.json();
      if(response.status >= 400){
        const error = new Error(data.message);
        error.statusCode = data.code;
        throw error;
      }
      dispatch({
        type: Type.SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: Type.ERROR,
        payload: {
          message: err.message,
          status: err.statusCode || 500,
        },
      });
    }
  }, []);
  const resetAllHandler = useCallback(() => {
    dispatch({ type: Type.RESET });
  }, []);
  return {
    isLoading: state.loading,
    error: state.error,
    data: state.data,
    getDataFromServerHandler: getDataFromServerHandler,
    status: state.status,
    resetAllHandler: resetAllHandler
  };
};

export default useFetch;

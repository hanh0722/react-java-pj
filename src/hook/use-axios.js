import axios from "axios";
import { useReducer, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { progressActions } from "../components/store/ProgressLoading/ProgressLoading";
const type = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  PROGRESS_UPLOAD: "PROGRESS",
  RESET: "RESET",
  PROGRESS_DOWNLOAD: "PROGRESS_DOWNLOAD",
  STATUS: "STATUS",
  STOP_LOADING: "STOP_LOADING"
};
const initialState = {
  isLoading: false,
  percentLoading: 0,
  error: null,
  data: null,
  percentDownload: 0,
  status: 200
};
const reducerFn = (state, action) => {
  switch (action.type) {
    case type.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case type.SUCCESS: {
      return {
        ...state,
        error: null,
        data: action.payload,
        isLoading: false,
      };
    }
    case type.ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case type.PROGRESS_UPLOAD: {
      return {
        ...state,
        percentLoading: action.payload,
      };
    }
    case type.STATUS: {
      return {
        ...state,
        status: action.payload
      }
    }
    case type.RESET: {
      return {
        ...initialState,
      };
    }
    case type.PROGRESS_DOWNLOAD: {
      return {
        ...state,
        percentDownload: action.payload,
      };
    }
    case type.STOP_LOADING: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
};
const useAxios = () => {
  const [state, dispatch] = useReducer(reducerFn, initialState);
  const dispatchEvent = useDispatch();
  const stopLoading = useCallback(() => {
    dispatch({
      type: type.STOP_LOADING
    })
  }, []); 
  useEffect(() => {
    if (state.percentDownload !== 0) {
      dispatchEvent(progressActions.setPercentByLoading(state.percentDownload));
    }
    if (state.percentLoading !== 0) {
      dispatchEvent(progressActions.setPercentByLoading(state.percentLoading));
    }
  }, [state.percentDownload, state.percentLoading, dispatchEvent]);
  const fetchDataFromServer = useCallback(
    async (routeConfig, cb_download, cb_upload, isShowProgress) => {
      try {
        dispatch({
          type: type.RESET,
        });
        dispatch({
          type: type.LOADING,
        });
        dispatchEvent(progressActions.resetPercent());
        dispatchEvent(progressActions.setStartLoading());
        const response = await axios({
          method: routeConfig.method ? routeConfig.method : "GET",
          url: routeConfig.url,
          headers: routeConfig.headers
            ? {
                ...routeConfig.headers,
              }
            : {},
          data: routeConfig.data ? routeConfig.data : null,
          params: routeConfig.params
            ? {
                ...routeConfig.params,
              }
            : null,
          onUploadProgress: (progressEvent) => {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if(cb_upload){
              cb_upload(percentCompleted);
            }
            dispatch({
              type: type.PROGRESS_UPLOAD,
              payload: percentCompleted,
            });
          },
          onDownloadProgress: (progressEvent) => {
            let percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (cb_download) {
              cb_download(percentage);
            }
            dispatch({
              type: type.PROGRESS_DOWNLOAD,
              payload: percentage,
            });
          },
        });
        if (response.status >= 400) {
          const error = new Error(response.data.message || "Cannot fetch data");
          error.statusCode = response.status || 500;
          throw error;
        }
        dispatch({
          type: type.SUCCESS,
          payload: response,
        });
        dispatch({
          type: type.STATUS,
          payload: response.status
        })
        setTimeout(() => {
          dispatchEvent(progressActions.finishedFetch());
        }, 1000);
      } catch (err) {
        const message = err?.response?.data?.message || "Cannot fetch data from server"
        const code = err?.response?.data?.code || 500;
        dispatch({
          type: type.STATUS,
          payload: code
        })
        dispatch({
          type: type.ERROR,
          payload: {
            message: message,
            code: code,
          },
        });
        dispatchEvent(progressActions.finishedFetch());
      }
    },
    [dispatchEvent]
  );
  return {
    isLoading: state.isLoading,
    percentLoading: state.percentLoading,
    error: state.error,
    data: state.data,
    fetchDataFromServer: fetchDataFromServer,
    percentDownload: state.percentDownload,
    status: state.status,
    stopLoading: stopLoading
  };
};

export default useAxios;

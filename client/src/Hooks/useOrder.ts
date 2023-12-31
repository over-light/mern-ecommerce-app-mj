import { useEffect } from "react";
import {useAppDispatch } from "../store/hooks";
import { handleSnackbar } from "../store/reducers/snackbarSlice";
import { getOrder } from "../store/reducers/Order/orderSlice";

export const useOrder = () => {
  const dispatch = useAppDispatch();
 
  //Get latest order
  useEffect(() => {
    (async () => {
      const response = await dispatch(getOrder());
      if (response?.meta?.requestStatus === "rejected") {
        // @ts-ignore: Unreachable code error
        dispatch(
          handleSnackbar({
            open: true,
            // @ts-ignore: Unreachable code error
            message: response?.error?.message,
            type: "error",
          })
        );
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    
  };
};

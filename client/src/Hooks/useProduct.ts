import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getProduct } from "../store/reducers/productSlice";
import { handleSnackbar } from "../store/reducers/snackbarSlice";
export const useProduct = () => {
  const product = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Array<any>>([]);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await dispatch(getProduct());
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

  useEffect(() => {
    setLoader(product?.products?.loader);
    setProducts(product?.products?.products);
  }, [product]);
  return {
    products,
    loader,
  };
};

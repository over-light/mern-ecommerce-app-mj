import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getProduct } from "../store/reducers/Product/productSlice";
import { handleSnackbar } from "../store/reducers/Snackbar/snackbarSlice";
import { getCategory } from "../store/reducers/Category/categorySlice";
import { getBrand } from "../store/reducers/Brand/brandSlice";

export const useProduct = () => {
  // Reducers state
  const product = useAppSelector((state) => state.product);


  const dispatch = useAppDispatch();

  //Local state
  const [products, setProducts] = useState<Array<any>>([]);
  const [productFilter,setProductFilter] = useState({
    page: 1,
    size:10,
    sortBy:'-_id',
    search:'',
    category:'all',
    brand:'all'
  })


// Get product api call
  useEffect(() => {
    (async () => {
      const response = await dispatch(getProduct({...productFilter}));
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
  }, [productFilter]);

  //Set product on local state
  useEffect(() => {
    setProducts(product?.products?.products);
  }, [product]);

  // Get category api call
  useEffect(() => {
    (async () => {
      const response = await dispatch(getCategory());
      if (response?.meta?.requestStatus === "rejected") {
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


   // Get category api call
   useEffect(() => {
    (async () => {
      const response = await dispatch(getBrand());
      if (response?.meta?.requestStatus === "rejected") {
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


 
  //Product sort by order
  const onProductFilterChange=(field:string,value:string)=>{
    setProductFilter((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }
  

  return {
    products,
    onProductFilterChange,
    productFilter,
    getProduct
  };
};

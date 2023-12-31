import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getProduct } from "../store/reducers/productSlice";
import { handleSnackbar } from "../store/reducers/snackbarSlice";
import { getCategory } from "../store/reducers/categorySlice";

export const useProduct = () => {
  // Reducers state
  const product = useAppSelector((state) => state.product);
  const categories = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  //Local state
  const [products, setProducts] = useState<Array<any>>([]);
  const [category,setCategory]= useState<Array<any>>([]);
  const [productFilter,setProductFilter] = useState({
    page: 1,
    size:10,
    sortBy:'',
    search:'',
    category:'all',
    brand:'all'
  })


  // Get product using filter api call
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

  // Get category using filter api call
  useEffect(() => {
    (async () => {
      const response = await dispatch(getCategory());
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

  //Set category on local state
  useEffect(() => {
    setCategory(categories?.category?.result);
  }, [categories]);
 
  //Product sort by order
  const onProductFilterChange=(field:string,value:string)=>{
    setProductFilter((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }
  

  return {
    products,
    category,
    onProductFilterChange,
    productFilter,
    getProduct
  };
};

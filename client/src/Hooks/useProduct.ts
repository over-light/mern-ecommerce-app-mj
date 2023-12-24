import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getProduct } from "../store/reducers/productSlice";
import { handleSnackbar } from "../store/reducers/snackbarSlice";
import { getCategory } from "../store/reducers/categorySlice";

export const useProduct = () => {
  const product = useAppSelector((state) => state.product);
  const categories = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Array<any>>([]);
  const [category,setCategory]= useState<Array<any>>([]);
  const [productFilter,setProductFilter] = useState({
    page: 1,
    size:10,
    sortBy:'',
    search:''
  })


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

  useEffect(() => {
    setProducts(product?.products?.products);
  }, [product]);


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

  useEffect(() => {
    setCategory(categories?.category?.result);
  }, [categories]);

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
  };
};

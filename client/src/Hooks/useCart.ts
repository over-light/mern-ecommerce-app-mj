import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { handleSnackbar } from "../store/reducers/snackbarSlice";
import { addToCart, deleteCartItem, getCartItem,updateCartItem } from "../store/reducers/cartSlice";

export const useCart = () => {
 const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const response = await dispatch(getCartItem());
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


  const onAddCart=async(id:number)=>{

  const response = await dispatch(addToCart({id,quantity:1}));

  if (response?.meta?.requestStatus === "fulfilled") { 
    await dispatch(getCartItem())

      dispatch(
        handleSnackbar({
          open: true,
          message: response?.payload?.message,
          type: "success",
        })
      );
    }
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
  }
  const onDeleteCart=async(id:string)=>{
    const response= await (dispatch(deleteCartItem(id)))

        if (response?.meta?.requestStatus === "fulfilled") { 
          await dispatch(getCartItem())

            dispatch(
              handleSnackbar({
                open: true,
                message: response?.payload?.message,
                type: "success",
              })
            );
        }

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
  }
 
  const onUpdateCart=async(id:string,quantity:number)=>{
  
    const response =  await dispatch(updateCartItem({id,quantity}))
    if (response?.meta?.requestStatus === "fulfilled") { 
      await dispatch(getCartItem())
  
        dispatch(
          handleSnackbar({
            open: true,
            message: response?.payload?.message,
            type: "success",
          })
        );
        if(quantity<=0){
          onDeleteCart(id)
        }
    }

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
  }


  return {
    onAddCart,
    onUpdateCart
  };
};

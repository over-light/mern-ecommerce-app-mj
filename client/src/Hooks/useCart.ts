import {  useEffect, useState } from "react";
import { ProductProps } from "../store/reducers/product/type";
import { getItem, removeItem, setItem } from "../utils/storage";
import { useNavigate, useParams } from "react-router-dom";
import { getProductBySlug } from "../store/reducers/productSlice";
import { useAppDispatch } from "../store/hooks";
import { handleSnackbar } from "../store/reducers/snackbarSlice";
import { placeOrder } from "../store/reducers/Order/orderSlice";


export const useCart = () => {
//Local state 
const [cart,setCart]=useState<any>([])
const [totalQuantity,setQuantity]=useState(0);
const [isItemInCart,setIsItemInCart]=useState(false)

// Hook
const params=useParams()
const dispatch = useAppDispatch();
const navigate=useNavigate();


// Update total quantity and update item flag
useEffect(()=>{
  const existingDataString = getItem<any>('cart');
  let existingData: any = existingDataString ? existingDataString : [];
  
  const findIndex=existingData.findIndex((item: { slug: string; })=>item.slug===params?.slug)

  if(findIndex!==-1){
    setIsItemInCart(true)
    
    setQuantity(existingData[findIndex]?.totalQuantity)
  }
  setCart(existingData)
},[params?.slug])

// Call product item api
useEffect(()=>{
  if(params?.slug){
    dispatch(getProductBySlug({slug:params?.slug}))
  }
},[dispatch, params?.slug])

// Update product item quantity
const onCartItemUpdate=(quantity:number,productQuantity:number)=>{  
    if(quantity<=productQuantity && quantity>0){
      setQuantity(quantity)
    }
  }

// Add and update item on cart
const onAddCart=async(product:ProductProps)=>{
  const existingDataString = getItem<any>('cart');
  let existingData: any = existingDataString ? existingDataString : [];
  
  const findIndex=existingData?.findIndex((item: { _id: string; })=>item._id===product?._id);

  if(totalQuantity>0){
    if (existingData.length > 0) {
      if(findIndex!==-1){
        existingData[findIndex]['totalQuantity']=totalQuantity
        setItem('cart',existingData)
        setCart(existingData)
      }
      else{
        existingData.push({...product,totalQuantity})
        setItem('cart',existingData)
        setCart(existingData)
        setIsItemInCart(true)
      }
    } else {
      setItem('cart', [{...product,totalQuantity}]);
      setCart([{...product,totalQuantity}])
      setIsItemInCart(true)
    } 
  }
     
}
  
// Update cart item
const onUpdateCart=async(id:string,quantity:number)=>{
  const existingDataString = getItem<any>('cart');
  let existingData: any = existingDataString ? existingDataString : [];
  
  const findIndex=existingData.findIndex((item: { _id: string; })=>item._id===id)
  
  if (existingData.length > 0) {
    if(quantity===0){
      if(findIndex!==-1){ 
        const updatedCart = existingData?.filter((item: { _id: string; }) => item._id !== id);
        setItem('cart',updatedCart);
        setCart(updatedCart)
      }
      
    }

    else if(findIndex!==-1){
      existingData[findIndex]['totalQuantity']=quantity
      setItem('cart',existingData)
      setCart(existingData)
    }
  }   
}

// Place order api call
const onPlaceOrder=async()=>{
  const payload=cart.map((order: { price: string; _id: string; totalQuantity: number; })=>{return  {price:order?.price,product:order?._id,quantity:order?.totalQuantity}})
  console.log(payload)

  const response = await dispatch(
    placeOrder({
      order: payload,
    })
  );
  if (response?.meta?.requestStatus === "fulfilled") {
    removeItem('cart')
    navigate('/order')

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

  return {
    onAddCart,
    onUpdateCart,
    onCartItemUpdate,
    totalQuantity,
    isItemInCart,
    cart,
    onPlaceOrder
  };
};

import { useAppSelector } from "../../../store/hooks";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Container } from "@mui/material";
import { useCart } from "../../../hooks/useCart";
import { Loader } from "../../../component/Loader";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(3),
  }));

export const Product =()=>{
    const {onAddCart,onCartItemUpdate,totalQuantity,isItemInCart}=useCart()
    
    //Get state from reducers
    const products = useAppSelector((state) => state.product);

    const product=products?.product
    return (
        <Container maxWidth="xl" sx={{ paddingTop: "30px" }}>
             {products?.loading?<Loader/>:
        <Box sx={{ flexGrow: 1 , margin:'30px 0'}}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} md={4}>
                    <Item>
                        <img src={product?.imageUrl} alt={product?.name} style={{width:'100%'}}/>
                    </Item>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Item  sx={{display: "flex",flexDirection:'column',gap:'20px'}}>
                        <h1 style={{fontSize:'30px'}}>{product?.name}</h1>
                        <p>{product?.description}</p>
                        <b>${product?.price}</b>
                        <span className="input-wrapper">
                            <button id="decrement" onClick={()=>onCartItemUpdate(totalQuantity-1,product?.quantity)}>-</button>
                            <input 
                                type="number"
                                onChange={(e)=>e.preventDefault()}
                                value={totalQuantity} min={1} max={product.quantity}/>
                            <button id="increment" onClick={()=>onCartItemUpdate(totalQuantity+1,product?.quantity)}>+</button>
                        </span>
                       {product?.quantity>0? <Button sx={{width:'200px'}} variant="contained" onClick={()=>{onAddCart(product)}}>{isItemInCart?'Update Cart':'Add to Cart'}</Button>:<p className="error">Out of stock</p>}
                    </Item>
                </Grid>
            </Grid>
         </Box>
}
      </Container>
    )
}
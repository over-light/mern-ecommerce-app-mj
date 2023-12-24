import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { ProductProps } from "../store/reducers/productSlice";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";

type ProductItemProps = {
  product: ProductProps;
  onAddCart:(id:number)=>void
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const ProductItem: React.FC<ProductItemProps> = ({ product,onAddCart }) => {
  const navigate =useNavigate();

  const cart = useAppSelector((state) => state.cart);
  const cartItem=cart?.cartItem?.cartItems;

  const isCartItem = cartItem.some((item: { productId: number; }) => item.productId === product?.id);

  return (
    <Item sx={{ marginBottom: '20px' }}>
      <div style={{height:"100px"}}>
      <img
        src={product?.url}
        alt={product?.name}
        style={{ width: "100%",height:'100%', objectFit:'contain', marginBottom: "15px" }}
      />
      </div>
      <Divider variant="fullWidth" component="div" />

      <div  className="card">
        <h3>{product?.name}</h3>
        <p>{product?.description}</p>
        <p className="price">{product?.price}</p>
      </div>
      {
        isCartItem ? <Button color="primary" type="button" variant="outlined" onClick={()=>{navigate('/cart')}}>
        View Cart
      </Button>: <Button color="primary" type="button" variant="outlined" onClick={()=>{onAddCart(product?.id)}}>
        Add to cart
      </Button>
      }
     
    </Item>
  );
};

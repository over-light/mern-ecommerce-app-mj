import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { ProductProps } from "../store/reducers/Product/type";

type ProductItemProps = {
  product: ProductProps;
  onAddCart:(product:ProductProps)=>void
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

  return (
    <Item sx={{ marginBottom: '20px',cursor:'pointer' }} onClick={()=>{navigate(`/product/${product?.slug}`)}}>
      <div style={{height:"100px"}}>
      <img
        src={product?.imageUrl}
        alt={product?.name}
        style={{ width: "100%",height:'100%', objectFit:'contain', marginBottom: "15px" }}
      />
      </div>
      <Divider variant="fullWidth" component="div" />

      <div  className="card">
        <h3>{product?.name}</h3>
        <p>{product?.description}</p>
        <p className="price">Price :${product?.price}</p>
      </div>
         
    </Item>
  );
};

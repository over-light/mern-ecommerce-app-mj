import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { ProductProps } from "../store/reducers/productSlice";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
type ProductItemProps = {
  product: ProductProps;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Item sx={{ marginBottom: 2 }}>
      <img
        src={product?.url}
        alt={product?.name}
        style={{ width: "100%", marginBottom: "15px" }}
      />
      <Divider variant="fullWidth" component="div" />

      <div style={{ padding: "10px 0" }}>
        <h3>{product?.name}</h3>
        <p>{product?.description}</p>
        <p>{product?.price}</p>
      </div>
      <Button
        sx={{ marginRight: "15px" }}
        color="primary"
        type="button"
        variant="outlined"
      >
        Buy Now
      </Button>
      <Button color="primary" type="button" variant="outlined">
        Add to cart
      </Button>
    </Item>
  );
};

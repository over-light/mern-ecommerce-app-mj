import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ProductItem } from "../../../component/ProductItem";
import { useProduct } from "../../../Hooks/useProduct";
import { ProductProps } from "../../../store/reducers/productSlice";
import { Container, TextField } from "@mui/material";
import { Sidebar } from "../../../component/Sidebar";
import { Heading } from "../../../component/Heading";

type ProductListProps = {};

const ProductList: React.FC<ProductListProps> = () => {
  const { products } = useProduct();

  return (
    <Container maxWidth="xl" sx={{ paddingTop: "30px" }}>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "20%",

            bgcolor: "background.default",
            p: 3,
          }}
          mr={2}
        >
          <Sidebar />
        </Box>
        <Box
          component="main"
          sx={{ width: "80%", bgcolor: "background.default", p: 3 }}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              bgcolor: "background.default",
            }}
            pb={3}
          >
            <Box sx={{ width: "auto" }} mr={4}>
              <Heading title={"ProductList"} />
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                id="standard-basic"
                label="Search Product"
                variant="standard"
                sx={{ width: "100%" }}
              />
            </Box>
          </Box>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ marginTop: 2 }}
          >
            {products &&
              products?.map((product: ProductProps) => {
                return (
                  <Grid item xs={3}>
                    <ProductItem product={product} />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductList;

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ProductItem } from "../../../component/ProductItem";
import { useProduct } from "../../../Hooks/useProduct";

import { Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useCart } from "../../../Hooks/useCart";
import { ProductProps } from "../../../store/reducers/product/type";

type ProductListProps = {};

export const ProductList: React.FC<ProductListProps> = () => {
  const { products,onProductFilterChange,productFilter } = useProduct();
  const {onAddCart}=useCart()
  
  return (
    <Container maxWidth="xl" sx={{ paddingTop: "30px" }}>
      <Box sx={{ display: "flex" }}>
        
        <Box
          component="main"
          sx={{ width: "100%", bgcolor: "background.default", p: 3 }}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              bgcolor: "background.default",
            }}
            pb={3}
          >
            <Box sx={{ width: "30%" }} mr={4}>
            <FormControl fullWidth>
              <InputLabel id="product-sort">Sort by</InputLabel>
                    <Select
                    
                      labelId="product-select-label"
                      id="product-select"
                      value={productFilter?.sortBy}
                      label="sortBy"
                      onChange={(e)=>{onProductFilterChange('sortBy',e.target.value)}}
                    >
                        <MenuItem value={'-_id'}>Newest First</MenuItem>
                        <MenuItem value={'-price'}>Price High to Low</MenuItem>
                        <MenuItem value={'price'}>Price Low to High</MenuItem>
                    </Select>
          </FormControl>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                
                id="search-product"
                label="Search Product"
                variant="standard"
                sx={{ width: "100%" }}
                value={productFilter?.search}
                onChange={(e)=>{
                  onProductFilterChange('search',e.target.value)
                }}
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
                    <ProductItem   {...{onAddCart,product}}/>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

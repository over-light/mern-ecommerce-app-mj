import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ProductItem } from "../../../component/ProductItem";
import { useProduct } from "../../../hooks/useProduct";
import { Container, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useCart } from "../../../hooks/useCart";
import { ProductProps } from "../../../store/reducers/Product/type";
import { useAppSelector } from "../../../store/hooks";

type ProductListProps = {};

export const ProductList: React.FC<ProductListProps> = () => {
  const { products,onProductFilterChange,productFilter } = useProduct();
  const categories = useAppSelector((state) => state.category);
  const brand = useAppSelector((state) => state.brand);
  const {onAddCart}=useCart()

const renderCategory = ()=>{
  return categories?.category?.categories
  ?.map((cat: { name: string ,_id:string })=> <MenuItem key={cat._id} value={cat._id}>{cat?.name}</MenuItem>)
}

const renderBrand = ()=>{
  return brand?.brands?.categories
  ?.map((cat: { name: string ,_id:string })=> <MenuItem key={cat._id} value={cat._id}>{cat?.name}</MenuItem>)
}


  return (
    <Container maxWidth="xl" sx={{ paddingTop: "30px" }}>
      <Box>
      <Box
          component="main" mb={4}
          sx={{ width: "100%", bgcolor: "background.default", p: 3 }}
        >
        <div className="product_filter">
          <div className="search_filter">
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
          </div>
          <div className="sort_filter">
            <ul>
              <li>
                <InputLabel id="product-sort">Sort by</InputLabel>
                <Select
                    fullWidth
                    labelId="product-select-label"
                    id="product-select"
                    value={productFilter?.sortBy}
                    label="sortBy"
                    defaultValue="-_id"
                    onChange={(e)=>{onProductFilterChange('sortBy',e.target.value)}}
                  >
                      <MenuItem value={'-_id'}>Newest First</MenuItem>
                      <MenuItem value={'-price'}>Price High to Low</MenuItem>
                      <MenuItem value={'price'}>Price Low to High</MenuItem>
                </Select>
              </li>
              <li>
                <InputLabel id="brand-sort">Brand</InputLabel>
                <Select
                    fullWidth
                    labelId="brand-select-label"
                    id="brand-select"
                    value={productFilter?.brand}
                    label="brand"
                    defaultValue="all"
                    onChange={(e)=>{onProductFilterChange('brand',e.target.value)}}
                  >
                      <MenuItem value={'all'}>All</MenuItem>
                      {renderBrand()}
                </Select>
              </li>
              <li>
                <InputLabel id="category-sort">Category</InputLabel>
                <Select
                    disabled={categories?.loading}
                    fullWidth
                    labelId="category-select-label"
                    id="category-select"
                    value={productFilter?.category}
                    label="category"
                    onChange={(e)=>{onProductFilterChange('category',e.target.value)}}
                  >
                      <MenuItem value={'all'}>All</MenuItem>
                        {renderCategory()}
                </Select>
              </li>
            </ul>
          </div>
        </div>
        </Box>
      
       

        <Box
          component="main"
          sx={{ width: "100%", bgcolor: "background.default", p: 3 }}
        >
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

import { useAppSelector } from "../../store/hooks";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, TableFooter } from "@mui/material";
import { useCart } from "../../Hooks/useCart";
import { number } from "yup";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export const Cart=()=>{
    const cart = useAppSelector((state) => state.cart);
    const {onUpdateCart} =useCart()

    
// Calculate total quantity
const totalQuantity = cart?.cartItem?.cartItems?.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);

const totalPrice=(price: string,quantity: number)=>{
  return  (parseFloat(price.replace(',', '')) * quantity ).toFixed(2);
}


const calculateTotalPrice = () => {
  let totalPrice = 0;

  // Iterate through cart items
  cart?.cartItem?.cartItems && cart.cartItem.cartItems.forEach((item: { productId: { price: string; }; quantity: number; }) => {
    const price = item.productId.price.replace(',', ''); 
    const itemPrice = parseFloat(price) * item.quantity; 
    totalPrice += itemPrice;
  });

  return totalPrice.toFixed(2);
};

return (
    <Container
        sx={{ paddingTop: "30px",}}>
        <Box
        component="main"
        sx={{maxWidth:"1024" , bgcolor: "background.default", p: 3, margin:"0 auto" }}
        >
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.cartItem?.cartItems && cart.cartItem.cartItems.map((row:any) => (
            <StyledTableRow key={row?.productId?.name}>
              <StyledTableCell component="th" scope="row">
             <div style={{display:'flex',gap:'15px', alignItems:'center'}}>
              <img style={{width:'50px', height:'50px', objectFit:'contain'}} src={row?.productId?.image} alt={row?.productId?.name} id={row?.id}/> 
               {row?.productId?.name}
             </div>
              </StyledTableCell>
              <StyledTableCell align="right"> 
              <div className="cart-quantity-action">
                <span 
                className="cartButton" 
                onClick={()=>{onUpdateCart(row?._id,row.quantity-1)}}>-</span>
                  {row.quantity}
                <span className="cartButton" onClick={()=>{onUpdateCart(row?._id,row.quantity+1)}}>+</span>
              </div>
              </StyledTableCell>
              <StyledTableCell align="right">{totalPrice(row?.productId?.price,row.quantity)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <StyledTableCell align="left"><b>Total</b></StyledTableCell>
            <StyledTableCell align="center">{totalQuantity}</StyledTableCell>
            <StyledTableCell align="center">{calculateTotalPrice()}</StyledTableCell>
          </TableRow>
          <TableRow >
          <StyledTableCell align="right" colSpan={3}>
            <Button sx={{margin: "7px 0"}} type="button" variant="contained">Place Order</Button>
            </StyledTableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Box>
    </Container>

    )
}
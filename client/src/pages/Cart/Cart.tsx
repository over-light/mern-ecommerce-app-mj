
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, TableFooter } from "@mui/material";
import { useCart } from "../../hooks/useCart";
import { useAppSelector } from '../../store/hooks';
import { Loader } from '../../component/Loader';
import { useNavigate } from 'react-router-dom';


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
  const navigate=useNavigate();
  const {onUpdateCart,cart,onPlaceOrder} =useCart();

//Get state from reducers
const order = useAppSelector((state) => state.order);

// Calculate total quantity
const totalQuantity = cart?.reduce((total: any, item: { totalQuantity: any; }) => total + item.totalQuantity, 0);

const totalPrice=(price: string,quantity: number)=>{
  return  (parseFloat(price) * quantity ).toFixed(2);
}


const calculateTotalPrice = () => {
  let totalPrice = 0;

  // Iterate through cart items
  cart && cart?.forEach((item: { price: string; totalQuantity: number; }) => {
    // const price = item?.price?.replace(',', ''); 
    const itemPrice = parseFloat(item?.price) * item.totalQuantity; 
    totalPrice += itemPrice;
  });

  return totalPrice.toFixed(2);
};

return (
    <Container
        sx={{ paddingTop: "30px",}}>
      {order?.loading? <Loader/>:
        <Box
          component="main"
          sx={{maxWidth:"1024" , bgcolor: "background.default", p: 3, margin:"0 auto" }}
          >
            <TableContainer component={Paper}>
              {cart?.length>0?
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Product</StyledTableCell>
                      <StyledTableCell align="center">Quantity</StyledTableCell>
                      <StyledTableCell align="center">Price</StyledTableCell>
                      <StyledTableCell align="center">Total Price</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart?.map((row: { name: string ;imageUrl: string; _id: string; totalQuantity: number,price:string },index: number) => (
                      <StyledTableRow
                      
                      key={row?.name}>
                        <StyledTableCell component="th" scope="row">
                      <div style={{display:'flex',gap:'15px', alignItems:'center'}}>
                        <img style={{width:'50px', height:'50px', objectFit:'contain'}} 
                        src={row?.imageUrl} alt={row?.name} id={row?._id}/> 
                        {row?.name}
                      </div>
                        </StyledTableCell>
                        <StyledTableCell align="center"> 
                        <div className="cart-quantity-action">
                          <span 
                          className="cartButton" 
                          onClick={()=>{onUpdateCart(row?._id,row.totalQuantity-1)}}>-</span>
                            {row.totalQuantity}
                          <span className="cartButton" onClick={()=>{onUpdateCart(row?._id,row.totalQuantity+1)}}>+</span>
                        </div>
                        </StyledTableCell>
                        <StyledTableCell align="center">{row?.price}</StyledTableCell>
                        <StyledTableCell align="center">{totalPrice(row?.price,row.totalQuantity)}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <StyledTableCell align="left"><b>Total</b></StyledTableCell>
                      <StyledTableCell align="center">{totalQuantity}</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">{calculateTotalPrice()}</StyledTableCell>
                    </TableRow>
                    <TableRow >
                    <StyledTableCell align="right" colSpan={4}>
                      <Button sx={{margin: "7px 0"}} type="button" variant="contained" onClick={onPlaceOrder}>Place Order</Button>
                      </StyledTableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
            :
            <div className="message">
              <h1>Your Cart is Empty</h1>
              <p>Add something to make me happy :)</p>
              <Button variant='contained' onClick={()=>{navigate('/')}}>continue shopping</Button>
            </div> 
           }
            </TableContainer>
        </Box>
      }
    </Container>
    )
}
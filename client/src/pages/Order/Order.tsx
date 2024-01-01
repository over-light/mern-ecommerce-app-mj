import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container} from "@mui/material";
import { useOrder } from "../../hooks/useOrder"
import { useAppSelector } from "../../store/hooks";
import { formatDate } from '../../utils/commonFunction';
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
  

export const Order=()=>{
  const navigate=useNavigate()
    useOrder()
    const orderItem = useAppSelector((state) => state.order);


    return (<Container
        sx={{ paddingTop: "30px",}}>
      <Box
        component="main"
        sx={{maxWidth:"1024" , bgcolor: "background.default", p: 3, margin:"0 auto" }}
        >

      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Product Name</StyledTableCell>
            <StyledTableCell>Order Date</StyledTableCell>
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Total Price</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItem?.orderItem?.orders.map((order) =>
            order.products.map((product,index) => (
              <TableRow key={product._id} 
                onClick={()=>{navigate(`/product/${product.product?.slug}`)}}  
                style ={index % 2? { background : "#fdffe0",cursor:'pointer', }:{ background : "white",cursor:'pointer', }}>
                <TableCell>
                  <div style={{display:'flex',gap:'15px', alignItems:'center'}}>
                      <img style={{width:'50px', height:'50px', objectFit:'contain'}} src={product.product?.imageUrl} alt={product.product?.name} id={product.product?._id}/> 
                      {product.product?.name}
                    </div>
                </TableCell>
                <TableCell>{formatDate(order?.created)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.purchasePrice}</TableCell>
                <TableCell>{product.totalPrice}</TableCell>
                <TableCell>{product.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </Container>)
}
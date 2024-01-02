import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { Link, useNavigate } from 'react-router-dom';

type HeaderProps = {}

export const Header: React.FC<HeaderProps> = () => {
    const navigate=useNavigate();
    const cartCount=0;

    const user: any = document!.cookie
    .split("; ")
    .find((row) => row.startsWith("user="))
    ?.split("=")[1];

    const authUser=user?JSON.parse(user):undefined;
    
    const firstLetter = authUser?.firstName?.split("")?.[0]?.toUpperCase()  || "";

    // Logout user
    const logoutUser=()=>{
        localStorage.clear();
        document.cookie = `user =;expires=Thu, 01 Jan 1970 00:00:01 GMT;`
        document.cookie = `access_token =;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        
        navigate('/login')
    }
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <Link to="/" className='nav-item'>Home</Link>
                       {
                        !authUser?  <>
                            <Link to="/login" className='nav-item'>Login</Link>
                            <Link to="/register" className='nav-item'>Register</Link>
                            </>: <Link to="/order" className='nav-item'>Order</Link>
                       } 
                      
                        </Box>
                        {authUser &&
                            <Chip sx={{ cursor: 'pointer',marginRight: '20px' }} avatar={<Avatar>{firstLetter}</Avatar>} color='secondary' 
                            label={
                            <>
                                <span className='logout_user' onClick={logoutUser}>Logout</span>
                            </>
                        } />
                        }
                         <Chip sx={{ cursor: 'pointer' }} onClick={()=>{navigate('/cart')}} avatar={<Avatar>{cartCount||0}</Avatar>} color='secondary' label="Cart" />
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}



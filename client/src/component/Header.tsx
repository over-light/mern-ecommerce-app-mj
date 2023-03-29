

//MUI

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';

import { Modal } from "./Modal";
import { useAuth } from "../Hooks";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

const pages: Array<string> = ['Products', 'Blog'];


type HeaderProps = {}

export const Header: React.FC<HeaderProps> = () => {
    const { isLoginModal, onLoginModalToggle, onHandleChange, user, onLogin, switchAuthMode, isLogin, onSignup } = useAuth()

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
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Button color="inherit" onClick={onLoginModalToggle}>Login</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Modal
                title={isLogin ? 'Login' : 'Register'}
                onCancel={onLoginModalToggle}
                open={isLoginModal}
                maxWidth="xs"
            >
                {
                    isLogin ?
                        <Login onHandleChange={onHandleChange} user={user} onLogin={onLogin} switchAuthMode={switchAuthMode} /> :
                        <Signup onSignup={onSignup} user={user} onHandleChange={onHandleChange} switchAuthMode={switchAuthMode} />
                }

            </Modal>
        </>
    );
}



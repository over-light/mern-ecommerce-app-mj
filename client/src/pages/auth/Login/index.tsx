
import {Container, Button, TextField, Typography,Box } from "@mui/material";
import { useAuth } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../component/Loader";

type LoginProps = {}

export const Login: React.FC<LoginProps> = () => {
    const navigate=useNavigate()
    const { loginFormik, auth } = useAuth();
    const { dirty, isValid, values, errors, touched, handleChange, handleSubmit, } = loginFormik;
    
    return (
        <Container 
            sx={{ paddingTop: "30px",}}>
            {auth?.loading? <Loader/>:
                <Box
                component="main"
                sx={{maxWidth:"400px" , bgcolor: "background.default", p: 3, margin:"0 auto" }}
                >
                <form onSubmit={handleSubmit}>
                    <Typography mt={2}>
                        <TextField
                            fullWidth
                            type="email"
                            name="email"
                            label="Email"
                            variant='standard'
                            value={values.email}
                            onChange={handleChange}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                    </Typography>
                    <Typography mt={2}>
                        <TextField
                            fullWidth
                            type="password"
                            name="password"
                            label="Password"
                            variant='standard'
                            value={values.password}
                            onChange={handleChange}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />
                    </Typography>
                    <Typography mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button disabled={(!isValid && dirty) || auth.loading} sx={{ padding: '0' }} variant="text" color="primary" onClick={() => { navigate('/register') }}>Register</Button>
                        <Button disabled={(!isValid && dirty) || auth.loading} sx={{ padding: '0' }} variant="text" color="secondary" onClick={() => { navigate('/forgot-password') }}>Forgot</Button>
                    </Typography>
                    <Typography mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button disabled={(!isValid && dirty) || auth.loading} type="submit" variant="contained" color="primary">Login</Button>
                    </Typography>
                </form>
                </Box>
            }
        </Container>
    );
}

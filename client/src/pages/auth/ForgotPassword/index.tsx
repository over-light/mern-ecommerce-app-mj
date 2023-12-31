import { Button, TextField, Typography,Container,Box } from "@mui/material";
import { useAuth } from "../../../Hooks";
import { useNavigate } from "react-router-dom";

type ForgotPasswordProps = {}

export const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    const { forgotPasswordFormik } = useAuth();
    const navigate =useNavigate();

    const { values, handleChange, touched, errors, handleSubmit } = forgotPasswordFormik;
    return (
        <Container 
            sx={{ paddingTop: "30px",}}>
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
                    <Typography mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button sx={{ padding: '0' }} variant="text" color="primary" onClick={() => { navigate('/login') }}>Login</Button>
                        <Button sx={{ padding: '0' }} variant="text" color="secondary" onClick={() => { navigate('/register') }}>Register</Button>
                    </Typography>
                    <Typography mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" color="primary">Forgot</Button>
                    </Typography>
                </form>
        </Box>
        </Container>
    );
}

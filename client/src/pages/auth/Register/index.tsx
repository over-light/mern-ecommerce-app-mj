
import { Button, TextField, Typography,Container,Box } from "@mui/material";
import { useAuth } from "../../../Hooks";
import { useNavigate } from "react-router-dom";

type RegisterProps = {}

export const Register: React.FC<RegisterProps> = () => {
    const navigate=useNavigate()
    const { registerFormik } = useAuth();
    const { dirty, isValid, values, errors, touched, handleChange, handleSubmit, } = registerFormik;
    
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
                            name="firstName"
                            label="First Name"
                            variant='standard'
                            value={values.firstName}
                            onChange={handleChange}
                            error={touched.firstName && Boolean(errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                        />
                    </Typography>
                    <Typography mt={2}>
                        <TextField
                            fullWidth
                            name="lastName"
                            label="Last Name"
                            variant='standard'
                            value={values.lastName}
                            onChange={handleChange}
                            error={touched.lastName && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                        />
                    </Typography>
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
                    <Typography mt={2}>
                        <TextField
                            fullWidth
                            type="password"
                            name="retypePassword"
                            label="Verify Password"
                            variant='standard'
                            value={values.retypePassword}
                            onChange={handleChange}
                            error={touched.retypePassword && Boolean(errors.retypePassword)}
                            helperText={touched.retypePassword && errors.retypePassword}
                        />
                    </Typography>

                    <Typography mt={2}>
                        <TextField
                            fullWidth
                            name="mobile"
                            label="Mobile"
                            variant='standard'
                            value={values.mobile}
                            onChange={handleChange}
                            error={touched.mobile && Boolean(errors.mobile)}
                            helperText={touched.mobile && errors.mobile}
                        />
                    </Typography>
                    <Typography mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <p>Don't have an Account? <Button sx={{ padding: 0 }} variant="text" onClick={() => { navigate('/login') }}>Login Now!</Button></p>

                    </Typography>
                    <Typography mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button disabled={!isValid && dirty} type="submit" variant="contained" color="primary">Register</Button>
                    </Typography>
                </form>
            </Box>
        </Container>
    );
}

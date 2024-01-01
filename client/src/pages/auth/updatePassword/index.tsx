import { TextField, Typography, Button,Container,Box } from "@mui/material";
import { useAuth } from "../../../hooks";
import { Loader } from "../../../component/Loader";

type UpdatePasswordProps = {}

const UpdatePassword: React.FC<UpdatePasswordProps> = () => {
    const { updatePasswordFormik,auth } = useAuth();
    const { values, errors, touched, handleChange, handleSubmit, } = updatePasswordFormik;

    return (
        <Container 
            sx={{ paddingTop: "30px",}}>
            {auth?.loading? <Loader/>:
                <Box
                    component="main"
                    sx={{maxWidth:"400px" , bgcolor: "background.default", p: 3, margin:"0 auto" }}
                    >
                        <form onSubmit={handleSubmit}>
                        <Typography variant="h5" >
                                    Password Reset
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
                                <Typography mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button type="submit" variant="contained" color="primary">Update</Button>
                                </Typography>
                        </form>
                </Box>
            }
        </Container>
    );
}


export default UpdatePassword;
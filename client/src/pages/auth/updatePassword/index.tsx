import { TextField, Typography, Paper, Button } from "@mui/material";
import { useAuth } from "../../../Hooks";

type UpdatePasswordProps = {}

const UpdatePassword: React.FC<UpdatePasswordProps> = () => {
    const { updatePasswordFormik } = useAuth();
    const { values, errors, touched, handleChange, handleSubmit, } = updatePasswordFormik;

    return (
        <form onSubmit={handleSubmit}>
            <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,

                }}
            >
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
            </Paper>
        </form>
    );
}


export default UpdatePassword;
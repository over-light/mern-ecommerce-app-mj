
import { Button, TextField, Typography, Alert } from "@mui/material";

type LoginProps = {
    switchAuthMode: () => void;
    loginFormik: any;
    auth: any
}

const Login: React.FC<LoginProps> = ({
    switchAuthMode,
    loginFormik,
    auth
}) => {
    const { dirty, isValid, values, errors, touched, handleChange, handleSubmit, } = loginFormik;

    return (
        <form onSubmit={handleSubmit}>
            {auth?.error && <Alert severity="error">{auth?.error}</Alert>}
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
                <Button sx={{ padding: '0' }} variant="text" color="primary" onClick={switchAuthMode}>Register</Button>
                <Button sx={{ padding: '0' }} variant="text" color="secondary">Forgot</Button>
            </Typography>
            <Typography mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button disabled={!isValid && dirty} type="submit" variant="contained" color="primary">Login</Button>
            </Typography>
        </form>
    );
}


export default Login;
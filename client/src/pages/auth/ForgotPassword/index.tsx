import { Button, TextField, Typography } from "@mui/material";

type ForgotPasswordProps = {
    onChangeScreen: (screen: string) => void;
    forgotPasswordFormik: any;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ forgotPasswordFormik, onChangeScreen }) => {
    const { values, handleChange, touched, errors, handleSubmit } = forgotPasswordFormik;
    return (
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
                <Button sx={{ padding: '0' }} variant="text" color="primary" onClick={() => { onChangeScreen('login') }}>Login</Button>
                <Button sx={{ padding: '0' }} variant="text" color="secondary" onClick={() => { onChangeScreen('register') }}>Register</Button>
            </Typography>
            <Typography mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit" variant="contained" color="primary">Forgot</Button>
            </Typography>
        </form>
    );
}


export default ForgotPassword;
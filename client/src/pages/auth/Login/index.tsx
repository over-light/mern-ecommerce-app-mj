
<<<<<<< HEAD
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
=======
import { Button, TextField, Typography } from "@mui/material";
import { userInterface } from "../../../type/interface";

type LoginProps = {
    onHandleChange(e: any, name: string): void;
    user: userInterface;
    onLogin: any,
    switchAuthMode: () => void;
}

const Login: React.FC<LoginProps> = ({ onHandleChange, user, onLogin, switchAuthMode }) => {

    return (
        <form onSubmit={onLogin}>
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
            <Typography mt={2}>
                <TextField
                    fullWidth
                    type="email"
<<<<<<< HEAD
                    name="email"
                    label="Email"
                    variant='standard'
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
=======
                    label="Email"
                    variant="standard"
                    value={user?.email}
                    onChange={(e: { target: { value: string; }; }) => { onHandleChange(e, 'email'); }}
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
                />
            </Typography>
            <Typography mt={2}>
                <TextField
                    fullWidth
                    type="password"
<<<<<<< HEAD
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
=======
                    label="Password"
                    variant="standard"
                    value={user?.email}
                    onChange={(e: { target: { value: string; }; }) => { onHandleChange(e, 'email'); }}
                />
            </Typography>
            <Typography mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="customLink" onClick={switchAuthMode}>Register</span>
                <span className="customLink" >Forgot</span>
            </Typography>
            <Typography mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit" variant="contained" color="primary">Login</Button>
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
            </Typography>
        </form>
    );
}


export default Login;
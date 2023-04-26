
<<<<<<< HEAD
import { Button, TextField, Typography, Alert } from "@mui/material";

type SignupProps = {
    switchAuthMode: any;
    registerFormik: any;
    auth: any
}

const Signup: React.FC<SignupProps> = ({ switchAuthMode, registerFormik, auth }) => {
    const { dirty, isValid, values, errors, touched, handleChange, handleSubmit } = registerFormik;
    return (
        <form onSubmit={handleSubmit}>
            {auth?.error && <Alert severity="error">{auth?.error}</Alert>}
            <Typography mt={2}>
                <TextField
                    fullWidth
                    name="name"
                    label="Full Name"
                    variant='standard'
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                />
            </Typography>
=======
import { Button, TextField, Typography } from "@mui/material";
import { userInterface } from "../../../type/interface";
import styled from "@emotion/styled";

type SignupProps = {
    onHandleChange: any;
    user: userInterface;
    switchAuthMode: any;
    onSignup: any;
}

const Signup: React.FC<SignupProps> = ({ onHandleChange, user, switchAuthMode, onSignup }) => {
    return (
        <form onSubmit={onSignup}>
            <Typography mt={2}>
                <TextField
                    fullWidth
                    type="text"
                    label="Name"
                    variant="standard"
                    value={user?.name}
                    onChange={
                        (e: { target: { value: string; }; }
                        ) => {
                            onHandleChange(e, 'name');
                        }}
                />
            </Typography>

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
                    value={user?.name}
                    onChange={
                        (e: { target: { value: string; }; }
                        ) => {
                            onHandleChange(e, 'email');
                        }}
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
=======
                    label="Password"
                    variant="standard"
                    value={user?.password}
                    onChange={
                        (e: { target: { value: string; }; }
                        ) => {
                            onHandleChange(e, 'password');
                        }}
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
                />
            </Typography>
            <Typography mt={2}>
                <TextField
                    fullWidth
                    type="password"
<<<<<<< HEAD
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
                <p>Don't have an Account? <Button sx={{ padding: 0 }} variant="text" onClick={switchAuthMode}>Login Now!</Button></p>

            </Typography>
            <Typography mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button disabled={!isValid && dirty} type="submit" variant="contained" color="primary">Register</Button>
=======
                    label="Password"
                    variant="standard"
                    value={user?.password}
                    onChange={
                        (e: { target: { value: string; }; }
                        ) => {
                            onHandleChange(e, 'password');
                        }}
                />
            </Typography>
            <Typography mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <p>Don't have an Account? <span className="customLink" onClick={switchAuthMode}>Login Now!</span></p>

            </Typography>
            <Typography mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit" variant="contained" color="primary">Register</Button>
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c
            </Typography>
        </form>
    );
}


export default Signup;
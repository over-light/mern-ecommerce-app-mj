
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

            <Typography mt={2}>
                <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    variant="standard"
                    value={user?.name}
                    onChange={
                        (e: { target: { value: string; }; }
                        ) => {
                            onHandleChange(e, 'email');
                        }}
                />
            </Typography>

            <Typography mt={2}>
                <TextField
                    fullWidth
                    type="password"
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
            <Typography mt={2}>
                <TextField
                    fullWidth
                    type="password"
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
            </Typography>
        </form>
    );
}


export default Signup;
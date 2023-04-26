
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
            <Typography mt={2}>
                <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    variant="standard"
                    value={user?.email}
                    onChange={(e: { target: { value: string; }; }) => { onHandleChange(e, 'email'); }}
                />
            </Typography>
            <Typography mt={2}>
                <TextField
                    fullWidth
                    type="password"
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
            </Typography>
        </form>
    );
}


export default Login;
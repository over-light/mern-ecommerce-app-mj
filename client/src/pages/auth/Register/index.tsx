
import { Button, TextField, Typography } from "@mui/material";

type RegisterProps = {
    onChangeScreen: (screen: string) => void;
    registerFormik: any;

}

const Register: React.FC<RegisterProps> = ({ onChangeScreen, registerFormik }) => {
    const { dirty, isValid, values, errors, touched, handleChange, handleSubmit } = registerFormik;
    return (
        <form onSubmit={handleSubmit}>
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
                <p>Don't have an Account? <Button sx={{ padding: 0 }} variant="text" onClick={() => { onChangeScreen('login') }}>Login Now!</Button></p>

            </Typography>
            <Typography mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button disabled={!isValid && dirty} type="submit" variant="contained" color="primary">Register</Button>
            </Typography>
        </form>
    );
}

export default Register;
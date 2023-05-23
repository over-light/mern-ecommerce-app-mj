import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAuth } from "../../../Hooks";
import { useEffect } from 'react';

type VerifyUserProps = {}

const VerifyUser: React.FC<VerifyUserProps> = () => {
    const { userVerify } = useAuth();

    useEffect(() => {
        userVerify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='centerDiv'>
            <div className='overlay'></div>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    );
}


export default VerifyUser;
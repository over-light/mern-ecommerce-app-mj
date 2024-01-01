import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAuth } from "../../../hooks";
import { useEffect } from 'react';
import { Loader } from '../../../component/Loader';

type VerifyUserProps = {}

const VerifyUser: React.FC<VerifyUserProps> = () => {
    const { userVerify } = useAuth();

    useEffect(() => {
        userVerify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='centerDiv'>
            <Loader/>
        </div>
    );
}


export default VerifyUser;
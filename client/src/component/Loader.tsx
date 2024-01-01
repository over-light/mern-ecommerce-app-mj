import { Box, CircularProgress } from "@mui/material"

export const Loader=()=>{
    return (
        <>
        <div className='overlay'></div>

            <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',alignContent:'center',height:'calc(100vh - 100px)' }}>
                <CircularProgress />
            </Box>
        </>
        
    )
}
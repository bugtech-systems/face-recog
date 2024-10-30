import { useDispatch, useSelector } from "react-redux"
import { getActiveTab, getLabel, setActiveTab } from "features/auth/authSlice"
import { Alert } from "./Alert"
import { PictureControls } from "./PictureControls"
import { Box, Typography } from "@mui/material"

export const FormTabs = ({imageType}) => {
    const label = useSelector(getLabel);
 

    return(
        <>
        <div className='form-container'>
       
            <Alert />
            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100px', textAlign: 'center'}}>
            {label &&  <Typography variant="h5" style={{color: label === 'Face not recognized!' ? 'red' : 'white'}}>{String(label).toUpperCase()}</Typography>}
         </Box>
            <PictureControls imageType={imageType}/>

        </div>
        </>
    )
}
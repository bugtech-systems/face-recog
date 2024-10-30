import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Camera } from './Camera';
import { Loader } from './Loader';
import 'styles/Auth.css';
import 'styles/App.css';
import CloseIcon from '@mui/icons-material/Close';
import { FormTabs } from './FormTabs'
import { AppBar, Dialog, IconButton, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { setCameraStatus, setScreenshot } from 'features/auth/authSlice';
import Slide from '@mui/material/Slide';
import { closeScannerModal, getUiScannerModal } from 'features/dashboard/uiSlice';
import { setFacenetMessage, setOutline } from 'features/auth/facenetSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageCapture({imageType}) {
  const dispatch = useDispatch();
  const scannerModal = useSelector(getUiScannerModal)
  
  const handleClose = () => {
    dispatch(setCameraStatus('closed'))
    dispatch(setScreenshot(null))
    // navigate(-1)
    // onClose()
    dispatch(closeScannerModal())
  }
  
  
  const handleCameraOpening = () => {
    dispatch(setCameraStatus('opened'))
    dispatch(setScreenshot(null))
    dispatch(setOutline('#ddd'))
    dispatch(setFacenetMessage('Place the face in the oval.'))
}

useEffect(() => {
    if(scannerModal !== null){
      handleCameraOpening();
    }
    
}, [scannerModal])


  return (
  
    <Dialog
        fullScreen
        open={scannerModal !== null}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
    <div className="limiter">
      <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
    <IconButton style={{  marginRight: '15px'}} onClick={() => handleClose()}>
        <CloseIcon style={{color: "white"}}/>
        </IconButton>
    
    </Toolbar>
  </AppBar>
    <Loader />
    <div className="container-login100" >    
    <div className="container wrap-login100">
    <div className="row">
        <div className="col-lg-6 col-md-12 l-side">
            <Camera imageType={imageType} />                        
        </div>
        <div className="col-lg-6 col-md-12 r-side">
                    <FormTabs imageType={imageType}/>
                </div>
    </div>
</div>
</div>
</div>

</Dialog>

  )
}


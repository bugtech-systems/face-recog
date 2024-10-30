import React, { useRef } from "react"
import {
    useParams,
    useNavigate
  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getCameraStatus, getScreenshot, setCameraStatus, setScreenshot, setIsFlashing, getActiveTab, setAuthError, getActiveSource, setActiveSource, setScreenshotFromURL, getURL, setURL, setLabel, setProfile } from "features/auth/authSlice"
import { setFacenetError, setFacenetMessage, setOutline } from "features/auth/facenetSlice"
import { uploadProfileImage } from "features/dashboard/dataSlice";
import { closeScannerModal } from "features/dashboard/uiSlice";

export const PictureControls = ({imageType}) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cameraStatus = useSelector(getCameraStatus)
    const screenshot = useSelector(getScreenshot)
    const activeTab = useSelector(getActiveTab)
    const activeSource = useSelector(getActiveSource)
    const fileInputRef = useRef()


    const handleActiveSource = (source) => {
        dispatch(setActiveSource(source))
        if (source === 'file') {
            dispatch(setCameraStatus('closed'))
        }
        dispatch(setScreenshot(null))
        dispatch(setURL(null))
        dispatch(setAuthError({login:{serverErr:null}}))
        dispatch(setAuthError({register:{serverErr:null}}))
    }

    const handleCameraClosing = () => {
        dispatch(setCameraStatus('closed'))
        dispatch(setScreenshot(null))
        dispatch(setOutline('#ddd'))
        dispatch(setFacenetMessage('Place the face in the oval.'))
    }

    const handleCameraOpening = () => {
        dispatch(setCameraStatus('opened'))
        dispatch(setScreenshot(null))
        dispatch(setOutline('#ddd'))
        dispatch(setLabel(''))
        dispatch(setFacenetMessage('Place the face in the oval.'))
    }

    const handleFileInputClick = () => {
        dispatch(setCameraStatus('closed'))
        dispatch(setScreenshot(null))
        dispatch(setFacenetError(null))
        fileInputRef.current.value = ''
        fileInputRef.current.click()
    }

    const handleFileUpload = () => {
        const input = fileInputRef.current
        const err = {}
        dispatch(setLabel(''))
        if (input.files && input.files[0] && input.files[0].size < 1500000) {
      
            if((imageType === 'picture1' || imageType === 'picture2')){
                // let pic1 = await baseToFormData(webcamRef.current.getScreenshot(), 'jpeg');
                const formData = new FormData();
                    formData.append('file', input.files[0]);
                    dispatch(uploadProfileImage(formData))
                    .then(({payload}) => {
                        dispatch(setProfile({[imageType]: `${payload.filename}`}))
                        dispatch(closeScannerModal())
                    });
            } else {
                const reader = new FileReader()
                reader.onload = (r) => {
                    dispatch(setScreenshot(r.target.result))
                    dispatch(setIsFlashing(true))
                }
                reader.readAsDataURL(input.files[0])
            }
            
            
        } else if (input.files && input.files[0] && input.files[0].size > 1500000) {
            err[activeTab] = {screenshot: 'The IMAGE file too large (max 1.5 MB).'}
            dispatch(setAuthError(err))
        } else {
            err[activeTab] = {screenshot: 'No IMAGE selected.'}
            dispatch(setAuthError(err))
        }
    }
  
    const handleSave = async () => {
         dispatch(setScreenshot(null))
         navigate(-1)
        // dispatch(setScreenshotFromURL({url: imageURL}))
    }

console.log(params, 'PARAMS')
    return(
        <>
        <span className="wrap-image-label">Capture face image</span>
        <div className="wrap-input100-image">
            <div className="form-check source-box">
                <ul className="source-nav">
                    <li>
                        <span
                            className={'nav-link '+ (activeSource === 'webcam' ? 'active' : '')}
                            onClick={() => handleActiveSource('webcam')}
                        >Webcam</span>
                    </li>
                    <li>
                        <span
                            className={'nav-link '+ (activeSource === 'file' ? 'active' : '')}
                            onClick={() => handleActiveSource('file')}
                        >File</span>
                    </li>
                </ul>
            </div>
            {
                activeSource === 'webcam' &&
                <>
                <button
                    type="button"
                    className="zoom-out"
                    onClick={() => cameraStatus === 'closed' ? handleCameraOpening() : handleCameraClosing()}
                >{screenshot != null ? 'Capture new image' : (cameraStatus === 'opened' ? 'Close Camera' : 'Open Camera')}</button>
            
                </>

            }
            {
                activeSource === 'file' &&
                <><button
                    type="button"
                    className="zoom-out"
                    onClick={() => handleFileInputClick()}
                >{screenshot == null ? 'Choose Photo' : 'Choose New Photo'}</button>
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={() => handleFileUpload()}
                /></>
            }
          
        </div>
        </>
    )
}
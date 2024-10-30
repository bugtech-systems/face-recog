import { useDispatch, useSelector } from "react-redux"
import { getCameraStatus, getIsFlashing, setCameraStatus, setAuthError, setIsFlashing, setScreenshot, setProfile } from "features/auth/authSlice"
import Webcam from "react-webcam"
import 'styles/Camera.css'
import { useEffect, useRef } from "react"
import { Preview } from "./Preview"
import * as faceapi from 'face-api.js'
import { getFacenetMessage, getOutline, setFacenetMessage, setOutline } from "features/auth/facenetSlice"
import { closeScannerModal } from "features/dashboard/uiSlice"
import { baseToFormData } from "utils/helpers"
import { uploadProfileImage } from "features/dashboard/dataSlice"

export const Camera = ({ imageType }) => {

    const dispatch = useDispatch()
    const isFlashing = useSelector(getIsFlashing)
    const cameraStatus = useSelector(getCameraStatus)
    const activeTab = 'login';
    const message = useSelector(getFacenetMessage)
    const outline = useSelector(getOutline)
    const webcamRef = useRef()
    const containerRef = useRef()
    const canvasRef = useRef()
    const detection = useRef()

    const takeScreenshot = async (desc) => {
        dispatch(setCameraStatus('closed'))
        console.log(imageType, 'IMAGE TYPE', desc)
        dispatch(setIsFlashing(true))
        if ((imageType === 'picture1' || imageType === 'picture2')) {
            let pic1 = await baseToFormData(webcamRef.current.getScreenshot(), 'jpeg');
            const formData = new FormData();
            formData.append('file', pic1);
            dispatch(uploadProfileImage(formData))
                .then(({ payload }) => {
                    dispatch(setProfile({ [imageType]: `${payload.filename}` }))
                    dispatch(closeScannerModal())
                });
        } else {
            dispatch(setScreenshot(webcamRef.current.getScreenshot()));
        }

    }

    const handleCameraError = () => {
        dispatch(setCameraStatus('closed'))
        const err = {}
        err[activeTab] = { serverErr: 'There was a problem accessing the WEBCAM. Grant permission and reload the page.' }
        dispatch(setAuthError(err))
    }


    const handleStreamVideo = async (e) => {
        const err = {}
        err[activeTab] = { serverErr: null }
        dispatch(setAuthError(err))

        // await faceapi.nets.tinyFaceDetector.loadFromUri('/facenet/models/tiny_face_detector')
        // await faceapi.nets. .loadFromUri('/facenet/models/tiny_face_detector')
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
        // await faceapi.nets.tinyFaceDetector.loadFromUri('/facenet/models/face_recognition')
        let descriptions = []
        let counter = 0
        detection.current = setInterval(async () => {
            if (counter <= 6) {
                const detections = await faceapi.detectAllFaces(webcamRef.current.video).withFaceLandmarks().withFaceDescriptors();

                if (detections.length === 1 && detections[0].detection.score > 0.50) {
                    console.log(detections[0].detection.score, 'wewe')

                    if (counter === 6) {
                        descriptions.push(detections[0].descriptor);
                    }
                    counter++
                    dispatch(setOutline('#00ff00'))
                    dispatch(setFacenetMessage('Stand still for ' + Math.round(3 - (counter / 2)) + ' seconds.'))
                } else {
                    counter = 0
                    dispatch(setOutline('#f00000'))
                    dispatch(setFacenetMessage('Place the face in the oval.'))
                }
            } else {
                takeScreenshot(descriptions)
            }
        }, 500)
    }




    useEffect(() => {
        return () => {
            clearInterval(detection.current)
        }
    }, [cameraStatus])




    return (
        <div className="camera-container" style={{ backgroundImage: 'url("/images/camera.jpg")' }} ref={containerRef}>
            {(cameraStatus === 'opened') &&
                <>
                    <Webcam
                        className="camera-video"
                        id="webcam"
                        ref={webcamRef}
                        screenshotFormat='image/jpeg'
                        screenshotQuality={1}
                        // width={500}
                        height={700}
                        mirrored={true}
                        videoConstraints={{ facingMode: 'user' }}
                        onUserMedia={(e) => handleStreamVideo(e)}
                        onUserMediaError={handleCameraError}
                    />
                    <canvas id="camera-canvas" ref={canvasRef}>Your browser does not support the HTML canvas tag.</canvas>
                    <div className="camera-face-overlay" style={{ borderColor: outline }}>
                        <div className="camera-face-message">{message}</div>
                    </div>
                </>
            }
            <Preview containerRef={containerRef} />
            <div
                className="camera-flash"
                style={{
                    animation: isFlashing && 'flashAnimation 750ms ease-out',
                }}
                onAnimationEnd={() => dispatch(setIsFlashing(false))}
            />
        </div>
    )
}
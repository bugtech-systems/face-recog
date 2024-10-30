import * as React from 'react';
import {
  useNavigate
} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import FingerIcon from 'assets/fingerPrint.png';
import NoImageIcon from 'assets/no-image.png';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, setProfile } from 'features/auth/authSlice';
import { getErrors, openScannerModal, setErrors } from 'features/dashboard/uiSlice';
import { STATIC_URL } from 'utils/api'


const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));


export default function PaymentForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { picture1, picture2, firstName, lastName } = useSelector(getProfile);
  let errors = useSelector(getErrors)

  const [thumbData, setThumbData] = React.useState([
    {
      url: FingerIcon,
      title: 'Left Finger',
      width: '250px',
    },
    {
      url: FingerIcon,
      title: 'Right Finger',
      width: '250px',
    }
  ]);

  const handleImg = (i) => {
    console.log(i, errors)
    let newErrors = { ...errors };
    if (newErrors[`picture${i + 1}`]) {
      delete newErrors[`picture${i + 1}`]
      dispatch(setErrors(newErrors))
    }
    dispatch(openScannerModal(`picture${i + 1}`))
  }

  console.log(errors)

  const imagesData = [{
    url: picture1 ? `${STATIC_URL}/${picture1}` : NoImageIcon,
    title: 'Camera',
    width: '250px',
  },
  {
    url: picture2 ? `${STATIC_URL}/${picture2}` : NoImageIcon,
    title: 'Camera',
    width: '250px',
  }]

  return (
    <React.Fragment>

      <Box >
        <Typography variant="h6" gutterBottom>
          Face Image
        </Typography>
        <br />
        <Grid container spacing={3}
          justifyContent="center"
          alignItems="center"
        >

          {imagesData.map((image, index) => {
            return (
              <Grid item center xs={6} md={6} style={{ display: 'flex', justifyContent: 'center', }}>
                <ImageButton
                  focusRipple
                  key={image.title}
                  style={{
                    width: image.width,
                    borderColor: 'red'
                  }}
                  onClick={() => handleImg(index)}
                >
                  <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                  <ImageBackdrop className="MuiImageBackdrop-root" style={{ backgroundColor: errors[`picture${index + 1}`] ? 'red' : 'rgba(0, 0, 0, 0.87)' }} />
                  <Image>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      sx={{
                        borderColor: 'yellowgreen',
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                      }}
                    >
                      Picture {index + 1}
                      <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                  </Image>
                </ImageButton>
              </Grid>
            )
          })}
        </Grid>
      </Box>
      <br /><br />
      <Box>
        <Typography variant="h6" gutterBottom>
          Biometrics
        </Typography>
        <br />

        <Grid container spacing={3}
          justifyContent="center"
          alignItems="center"
        >

          {thumbData.map((image, index) => {
            return (
              <Grid item center xs={6} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
                <ImageButton
                  focusRipple
                  key={image.title}
                  style={{
                    width: image.width,
                  }}
                  disabled
                >
                  <ImageSrc style={{ backgroundImage: `url(${image.url})`, backgroundSize: "150px", backgroundRepeat: "no-repeat" }} />
                  <ImageBackdrop className="MuiImageBackdrop-root" />
                  <Image>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                      }}
                    >
                      {image.title}
                      <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                  </Image>
                </ImageButton>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </React.Fragment>
  );
}
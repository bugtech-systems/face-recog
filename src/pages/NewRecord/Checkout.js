import * as React from 'react';
import Header from './Header';
import { Box, Grid, Paper } from '@mui/material';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import CopyRight from 'components/CopyRight';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getActiveTab, getProfile, setActiveTab, setProfile } from 'features/auth/authSlice';
import { baseToFormData } from 'utils/helpers';
import { validateProfileImage } from 'utils/validators';
import { setErrors } from 'features/dashboard/uiSlice';

const steps = ['Basic Information', 'Pictures & Biometrics'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout({ handleDrawerToggle }) {
  const dispatch = useDispatch();
  const profile = useSelector(getProfile)
  const activeStep = useSelector(getActiveTab);
  const [loading, setLoading] = React.useState(false)

  const handleNext = async () => {
    if (activeStep === 0) {
      let { valid, errors } = validateProfileImage(profile);
      console.log(valid, errors)

      if (!valid) {
        dispatch(setErrors(errors));
        if ((errors.firstName || errors.lastName || errors.mobileNumber)) {
          dispatch(setActiveTab(0))
          return
        }

        if ((errors.picture1 || errors.picture2)) {
          dispatch(setActiveTab(1))
          return
        }
      } else {
        dispatch(setActiveTab(activeStep + 1))
      }


    } else if (activeStep === 1) {
      setLoading(true)
      dispatch(createProfile(profile))
        .then(({ payload }) => {
          console.log(payload)
          if (payload.status === 201) {
            dispatch(setActiveTab(activeStep + 1))
          }
          setLoading(false)
        })
    }
  };

  const handleBack = () => {
    dispatch(setActiveTab(activeStep - 1))
  };

  return (
    <React.Fragment>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: "center" }}>
        <Header onDrawerToggle={handleDrawerToggle} />
        <Box maxWidth="md" component="main" sx={{ width: '100%', flex: 1, py: 3, px: 2 }}>

          <Paper variant="outlined" sx={{ my: { xs: 2, md: 2 }, p: { xs: 2, md: 2 }, bgcolor: '#eaeff1' }}>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h5" center>
                    New Record Created!
                  </Typography>
                  <Button variant='contained' onClick={() => {
                    dispatch(setActiveTab(0))
                    dispatch(setProfile({ mobileNumber: null, picture1: null, firstName: null, lastName: null, picture2: null }))
                  }
                  } sx={{ mt: 3, ml: 1 }}>
                    Create New Record
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={loading}
                  >
                    {activeStep === steps.length - 1 ? 'Save Record' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
          <CopyRight />

        </Box>
      </Box >
    </React.Fragment>
  );
}
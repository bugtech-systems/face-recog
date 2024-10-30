import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, setProfile } from 'features/auth/authSlice';
import { getErrors, setErrors } from 'features/dashboard/uiSlice';
import { InputAdornment } from '@mui/material';

export default function AddressForm() {
    const dispatch = useDispatch();
    const values = useSelector(getProfile)
    let errors = useSelector(getErrors)
 

    const handleChanges = prop => event => {
    let newErrors = {...errors};
        delete newErrors[prop];
        console.log(newErrors, prop);
        if(prop === 'mobileNumber' && String(event.target.value).length > 10){
          newErrors[prop] = 'Invalid Mobile Number';
          dispatch(setErrors(newErrors))
        return
        }
        
        dispatch(setErrors(newErrors))
        
        
        dispatch(setProfile({...values, [prop]: event.target.value}))
    }

    


  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={values.firstName}
            onChange={handleChanges('firstName')}
            error={errors.firstName}
            helperText={errors.firstName && errors.firstName}
            
          />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
          required
          id="middleName"
          name="middleName"
          label="Middle name"
          fullWidth
          autoComplete="family-name"
          variant="standard"
          value={values.middleName}
          onChange={handleChanges('middleName')}
        />
      </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={values.lastName}
            onChange={handleChanges('lastName')}
            error={errors.lastName}
            helperText={errors.lastName && errors.lastName}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
     
        <TextField
          required
          id="address1"
          name="address1"
          label="Mobile Number"
          fullWidth
          placeholder="ex. 9xxxxxxxxx"
          autoComplete="shipping address-line1"
          variant="standard"
          value={values.mobileNumber}
          onChange={handleChanges('mobileNumber')}
          error={errors.mobileNumber}
          helperText={errors.mobileNumber && errors.mobileNumber}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                  +63
              </InputAdornment>
            ),
          }}
        />
      </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={values.address}
            onChange={handleChanges('address')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          required
          id="brgy"
          name="brgy"
          label="Barangay"
          fullWidth
          autoComplete="shipping address-level2"
          variant="standard"
          value={values.brgy}
          onChange={handleChanges('brgy')}
        />
      </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={values.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={values.province}
          />
        </Grid>
       
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={values.country}
          />
        </Grid>
       
      </Grid>
    </React.Fragment>
  );
}
